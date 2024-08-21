import React, { useState, useCallback } from 'react';
import { Modal, Box, Typography, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';
import buttonStyles from '../../screens/ButtonStyles.module.css';

interface CreateListModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: number | null;
    onCreate: (listData: { name: string }) => void;
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

const CreateListModal: React.FC<CreateListModalProps> = ({
    isOpen,
    onClose,
    userId,
    onCreate,
    setIsAnyModalOpen,
}) => {
    const classes = useStyles();
    const [listName, setListName] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleCloseModal = useCallback(() => {
        onClose();
        setIsAnyModalOpen(false);
        setError(null);
    }, [onClose, setIsAnyModalOpen]);

    const handleCreate = () => {
        if (userId && listName.trim()) {
            onCreate({ name: listName });
            setListName('');
            handleCloseModal();
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
                    Create Curation List
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
                    onChange={(e) => setListName(e.target.value)}
                    margin="normal"
                />
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <button
                        className={`${buttonStyles.button} ${buttonStyles.medium}`}
                        onClick={handleCreate}
                        style={{ marginRight: '10px' }}
                    >
                        Create
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

export default CreateListModal;
