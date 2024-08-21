import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Box, Typography, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';
import buttonStyles from '../../screens/ButtonStyles.module.css';

interface RenameListModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: number | null;
    listId: number | null;
    initialName: string;
    onRename: (listData: { id: number; name: string }) => void;
    setIsAnyModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const useStyles = makeStyles(() => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '4px',
        outline: 'none',
        width: '400px',
    },
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
    },
}));

const RenameListModal: React.FC<RenameListModalProps> = ({
    isOpen,
    onClose,
    userId,
    listId,
    initialName,
    onRename,
    setIsAnyModalOpen,
}) => {
    const classes = useStyles();
    const [listName, setListName] = useState(initialName);
    const [error, setError] = useState<string | null>(null);

    console.log("RenameListModal render - isOpen:", isOpen, "listId:", listId, "initialName:", initialName);

    useEffect(() => {
        console.log("RenameListModal useEffect - isOpen:", isOpen, "initialName:", initialName);
        if (isOpen && initialName) {
            setListName(initialName);
            setError(null);
        }
    }, [isOpen, initialName]);

    const handleCloseModal = useCallback(() => {
        console.log("handleCloseModal called");
        onClose();
        setIsAnyModalOpen(false);
        setError(null);
    }, [onClose, setIsAnyModalOpen]);

    const handleSubmit = () => {
        console.log("handleSubmit called - listName:", listName, "listId:", listId);
        if (userId && listName.trim() && listId !== null) {
            onRename({ id: listId, name: listName.trim() });
        } else {
            setError('List name cannot be empty');
        }
    };

    return (
        <Modal open={isOpen} onClose={handleCloseModal} className={classes.modal}>
            <Box className={classes.modalContent}>
                <IconButton className={classes.closeButton} onClick={handleCloseModal}>
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" align="center" gutterBottom>
                    Rename Curation List
                </Typography>
                {error && (
                    <Typography color="error" align="center">
                        {error}
                    </Typography>
                )}
                <TextField
                    fullWidth
                    label="List Name"
                    value={listName}
                    onChange={(e) => {
                        console.log("TextField onChange - new value:", e.target.value);
                        setListName(e.target.value);
                    }}
                    margin="normal"
                />
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <button
                        className={`${buttonStyles.button} ${buttonStyles.medium}`}
                        onClick={handleSubmit}
                        style={{ marginRight: '10px' }}
                    >
                        Save
                    </button>
                    <button
                        className={`${buttonStyles.button} ${buttonStyles.medium}`}
                        onClick={handleCloseModal}
                    >
                        Cancel
                    </button>
                </div>
            </Box>
        </Modal>
    );
};

export default RenameListModal;