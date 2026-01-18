use axum::http::StatusCode;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum StorageWaveError {
    #[error("environment variable `{0}` is not set")]
    EnvConfigLoadingError(String),
    #[error("environment variable `{0}` cannot be parsed")]
    EnvVarParsingError(String),

    #[error("user was removed")]
    UserWasRemoved,

    #[error("{0} already exists")]
    AlreadyExists(String),
    #[error("{0} does not exist")]
    DoesNotExist(String),
    #[error("User already has a storage with such name")]
    StorageNameConflict,
    #[error("User already has a storage with such chat id")]
    StorageChatIdConflict,
    #[error("User already has a storage worker with such name")]
    StorageWorkerNameConflict,
    #[error("Token must be unique")]
    StorageWorkerTokenConflict,
    #[error("not authenticated")]
    NotAuthenticated,
    #[error("[Telegram API] {0}")]
    TelegramAPIError(String),
    #[error("You need to add at least 1 storage worker")]
    NoStorageWorkers,
    #[error("Invalid path")]
    InvalidPath,
    #[error("Invalid folder name")]
    InvalidFolderName,
    #[error("You cannot manage access of yourself")]
    CannotManageAccessOfYourself,
    #[error("Storage does not have workers")]
    StorageDoesNotHaveWorkers,
    #[error("unknown error")]
    Unknown,
    #[error("{0} header is required")]
    HeaderMissed(String),
    #[error("{0} header should be a valid {1}")]
    HeaderIsInvalid(String, String),
}

// Backward compatibility alias
pub use StorageWaveError as PentaractError;

impl From<StorageWaveError> for (StatusCode, String) {
    fn from(e: StorageWaveError) -> Self {
        match &e {
            StorageWaveError::AlreadyExists(_)
            | StorageWaveError::StorageNameConflict
            | StorageWaveError::StorageChatIdConflict
            | StorageWaveError::StorageWorkerNameConflict
            | StorageWaveError::StorageWorkerTokenConflict
            | StorageWaveError::StorageDoesNotHaveWorkers
            | StorageWaveError::CannotManageAccessOfYourself => (StatusCode::CONFLICT, e.to_string()),
            StorageWaveError::NotAuthenticated => (StatusCode::UNAUTHORIZED, e.to_string()),
            StorageWaveError::DoesNotExist(_) => (StatusCode::NOT_FOUND, e.to_string()),
            StorageWaveError::HeaderMissed(_)
            | StorageWaveError::HeaderIsInvalid(..)
            | StorageWaveError::InvalidFolderName => (StatusCode::BAD_REQUEST, e.to_string()),
            _ => {
                tracing::error!("{e}");
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    "Something went wrong".to_owned(),
                )
            }
        }
    }
}

impl From<reqwest::Error> for StorageWaveError {
    fn from(e: reqwest::Error) -> Self {
        match e.status() {
            Some(e) if e.is_client_error() => StorageWaveError::TelegramAPIError(e.to_string()),
            Some(_) | None => {
                tracing::error!("{e}");
                StorageWaveError::Unknown
            }
        }
    }
}

pub type StorageWaveResult<T> = Result<T, StorageWaveError>;
// Backward compatibility alias
pub use StorageWaveResult as PentaractResult;
