import React, { PropsWithChildren, createContext, useReducer, useCallback } from 'react';
import styles from './Modal.module.scss';

type State = {
  open: boolean;
  title: string;
  msg: string;

  onConfirm?: () => void;
  onClose?: () => void;
};
type Action = { type: 'show'; state: Omit<State, 'open'> } | { type: 'close' };
type Dispatch = (action: Action) => void;

function Modal({ open, title, msg, onConfirm, onClose, dispatch }: State & { dispatch: Dispatch }) {
  const onCloseClick = useCallback(() => {
    onClose && onClose();

    dispatch({ type: 'close' });
  }, [onClose, dispatch]);

  if (!open) {
    return <></>;
  }

  return (
    <div className={styles.modal} onClick={onCloseClick}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3>{title}</h3>
        </div>
        <div className={styles.body}>
          <p>{msg}</p>
        </div>
        <div className={styles.footer}>
          {onConfirm && (
            <button className={styles.confirm} onClick={onConfirm}>
              confirm
            </button>
          )}

          <button className={styles.close} onClick={onCloseClick}>
            close
          </button>
        </div>
      </div>
    </div>
  );
}

const ModalStateContext = createContext<State | undefined>(undefined);
const ModalDispatchContext = createContext<Dispatch | undefined>(undefined);

function useModelState() {
  const context = React.useContext(ModalStateContext);

  if (context === undefined) {
    throw new Error('useModelState must be used within a ModalProvider');
  }

  return context;
}

function useModelDispatch() {
  const context = React.useContext(ModalDispatchContext);

  if (context === undefined) {
    throw new Error('useModelDispatch must be used within a ModalProvider');
  }

  return context;
}

function modelReducer(state: State, action: Action) {
  switch (action.type) {
    case 'close': {
      return { ...state, open: false };
    }
    case 'show': {
      return { ...action.state, open: true };
    }
  }
}

function ModalProvider({ children }: PropsWithChildren<{}>) {
  const [state, dispatch] = useReducer(modelReducer, { open: false, title: '', msg: '' });

  return (
    <ModalStateContext.Provider value={state}>
      <ModalDispatchContext.Provider value={dispatch}>
        {children}
        <Modal {...state} dispatch={dispatch} />
      </ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
}

export { ModalProvider, useModelState, useModelDispatch };
