// my-gallery/src/components/modals/CurationListModal.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Box, Typography, IconButton, Checkbox, FormControlLabel, Menu, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';
import CreateListModal from './CreateListModal';
import RenameListModal from './RenameListModal';
import buttonStyles from '../../screens/ButtonStyles.module.css';
import { useNavigate } from 'react-router-dom';

interface CurationListModalProps {
    isOpen: boolean;
    onClose: () => void;
    photoId: string;
    diptychIdCode: string;
    userId: number | null;
    setIsAnyModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CurationList {
    id: number;
    name: string;
    artworkCount: number;
}

interface CurationListUserPhoto {
    listId: number;
    photoId: string;
    diptychCode: string;
    removed: boolean;
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
    listContainer: {
        marginBottom: '16px',
    },
    listItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
        padding: '8px',
        border: '1px solid #ddd',
        borderRadius: '4px',
    },
    threeDotsButton: {
        cursor: 'pointer',
        marginLeft: '8px',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
    },
}));

const CurationListModal: React.FC<CurationListModalProps> = ({
    isOpen,
    onClose,
    photoId,
    diptychIdCode,
    userId,
    setIsAnyModalOpen,
}) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [curationLists, setCurationLists] = useState<CurationList[]>([]);
    const [listPhotos, setListPhotos] = useState<CurationListUserPhoto[]>([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
    const [selectedListId, setSelectedListId] = useState<number | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [autoClose, setAutoClose] = useState(true);
    const [currentListName, setCurrentListName] = useState<string | undefined>(undefined);
    const [renameListInfo, setRenameListInfo] = useState<{ id: number; name: string } | null>(null);
    const [showArtworkCount, setShowArtworkCount] = useState(true);

    const handleCloseModal = useCallback(() => {
        onClose();
        setIsAnyModalOpen(false);
    }, [onClose, setIsAnyModalOpen]);

    const fetchData = useCallback(async () => {
      if (!userId) {
          console.log("fetchData: userId is null, returning");
          return;
      }

      console.log("fetchData: Starting data fetch");
      try {
          const [listsResponse, photosResponse] = await Promise.all([
              fetch(`/api/curation/user/${userId}`),
              fetch(`/api/curation/user/${userId}/photos`)
          ]);

          if (!listsResponse.ok) {
              throw new Error(`HTTP error! status: ${listsResponse.status}`);
          }
          if (!photosResponse.ok) {
              throw new Error(`HTTP error! status: ${photosResponse.status}`);
          }

          const listsData = await listsResponse.json();
          const photosData = await photosResponse.json();

          console.log("fetchData: Lists data:", listsData);
          console.log("fetchData: Photos data:", photosData);

          const photoArray = Array.isArray(photosData) ? photosData : [];
          setListPhotos(photoArray);

          const counts = photoArray.reduce((acc: { [key: number]: number }, photo) => {
              if (!photo.removed) {
                  acc[photo.listId] = (acc[photo.listId] || 0) + 1;
              }
              return acc;
          }, {});

          console.log("fetchData: Calculated counts:", counts);

          const updatedLists = listsData.map((list: any) => ({
              ...list,
              artworkCount: counts[list.id] || 0
          }));

          console.log("fetchData: Updated lists:", updatedLists);

          setCurationLists(updatedLists);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  }, [userId]);

  useEffect(() => {
      console.log("useEffect: isOpen changed to", isOpen);
      if (isOpen) {
          fetchData();
      }
  }, [isOpen, fetchData]);

  const handleAddToList = async (listId: number) => {
    console.log(`handleAddToList: Adding photo ${photoId} to list ${listId}`);
    try {
        const response = await fetch(`/api/curation/user/${listId}/photo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ photoId, diptychCode: diptychIdCode }),
        });

        if (response.ok) {
            console.log("handleAddToList: Photo added successfully");
            await fetchData(); // Refetch all data to update counts and statuses
            if (autoClose) handleCloseModal();
        } else {
            console.error('Failed to add photo to list');
            const errorText = await response.text();
            console.error('Error response:', errorText);
        }
    } catch (error) {
        console.error('Error adding to curation list:', error);
    }
};

const handleRemoveFromList = async (listId: number) => {
    console.log(`handleRemoveFromList: Removing photo ${photoId} from list ${listId}`);
    try {
        const response = await fetch(`/api/curation/user/${listId}/photo/${photoId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ diptychCode: diptychIdCode }),
        });

        if (response.ok) {
            console.log("handleRemoveFromList: Photo removed successfully");
            await fetchData(); // Refetch all data to update counts and statuses
        } else {
            console.error('Failed to remove photo from list');
            const errorText = await response.text();
            console.error('Error response:', errorText);
        }
    } catch (error) {
        console.error('Error removing from curation list:', error);
    }
};

const listContainsPhoto = (listId: number) => {
  return listPhotos.some(
      (photo) => photo.listId === listId && photo.photoId === photoId && photo.diptychCode === diptychIdCode && !photo.removed
  );
};

    const handleThreeDotsClick = (event: React.MouseEvent<HTMLElement>, listId: number, listName: string) => {
        setAnchorEl(event.currentTarget);
        setSelectedListId(listId);
        setCurrentListName(listName);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedListId(null);
        setCurrentListName(undefined);
    };

    const handleRenameList = useCallback((listId: number, listName: string) => {
      console.log(`handleRenameList called with listId: ${listId}, listName: ${listName}`);
      setRenameListInfo({ id: listId, name: listName });
      setIsRenameModalOpen(true);
      handleMenuClose();
    }, []);

    const handleCloseRenameModal = useCallback(() => {
        console.log("handleCloseRenameModal called");
        setIsRenameModalOpen(false);
        setRenameListInfo(null);
    }, []);



    const handleDeleteList = () => {
        if (selectedListId) {
            fetch(`/api/curation/user/${selectedListId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(() => {
                    setCurationLists((prev) => prev.filter((list) => list.id !== selectedListId));
                    handleMenuClose();
                })
                .catch((error) => console.error('Error deleting curation list:', error));
        }
    };

    const handleViewList = () => {
        if (selectedListId) {
            navigate(`/curation-list/${userId}/${selectedListId}`);
        }
        handleMenuClose();
    };


  const updateArtworkCounts = (photos: CurationListUserPhoto[]) => {
    const counts = photos.reduce((acc: { [key: number]: number }, photo) => {
        if (!photo.removed) {
            acc[photo.listId] = (acc[photo.listId] || 0) + 1;
        }
        return acc;
    }, {});

    setCurationLists((prevLists) =>
        prevLists.map((list) => ({
            ...list,
            artworkCount: counts[list.id] || 0,
        }))
    );
};

    useEffect(() => {
        const storedPreference = localStorage.getItem('showArtworkCount');
        if (storedPreference !== null) {
            setShowArtworkCount(JSON.parse(storedPreference));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('showArtworkCount', JSON.stringify(showArtworkCount));
    }, [showArtworkCount]);

    console.log("Render: Current curation lists:", curationLists);
    console.log("Render: Current list photos:", listPhotos);
    console.log("Render: Selected list ID:", selectedListId);
    console.log("Render: Current list name:", currentListName);
    console.log("Render: Rename list info:", renameListInfo);
    console.log("Render: Is rename modal open:", isRenameModalOpen);

    return (
        <Modal open={isOpen} onClose={handleCloseModal} className={classes.modal}>
            <Box className={classes.modalContent}>
                <IconButton className={classes.closeButton} onClick={handleCloseModal}>
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" align="center" gutterBottom>
                    Do you want to add this artwork to one of your curation lists?
                </Typography>
                <div className={classes.listContainer}>
                    {curationLists.map((list) => (
                        <div key={list.id} className={classes.listItem}>
                            <span>
                                {list.name}
                                {showArtworkCount && ` - (${list.artworkCount} Artworks)`}
                            </span>
                            <div>
                                {listContainsPhoto(list.id) ? (
                                    <button
                                        className={`${buttonStyles.button} ${buttonStyles.small}`}
                                        onClick={() => handleRemoveFromList(list.id)}
                                    >
                                        Remove
                                    </button>
                                ) : (
                                    <button
                                        className={`${buttonStyles.button} ${buttonStyles.small}`}
                                        onClick={() => handleAddToList(list.id)}
                                    >
                                        Add
                                    </button>
                                )}
                                <IconButton
                                    className={classes.threeDotsButton}
                                    onClick={(event) => handleThreeDotsClick(event, list.id, list.name)}
                                >
                                    <span>⋮</span>
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl) && selectedListId === list.id}
                                    onClose={handleMenuClose}
                                >
                                    <MenuItem onClick={() => handleRenameList(list.id, list.name)}>Rename List</MenuItem>
                                    <MenuItem onClick={() => { handleDeleteList(); handleMenuClose(); }}>Delete List</MenuItem>
                                    <MenuItem onClick={() => { handleViewList(); handleMenuClose(); }}>View List</MenuItem>
                                </Menu>
                            </div>
                        </div>
                    ))}
                </div>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={autoClose}
                            onChange={(e) => setAutoClose(e.target.checked)}
                            color="primary"
                        />
                    }
                    label="Auto-close after adding"
                    style={{ marginBottom: '8px', display: 'block', textAlign: 'center' }}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={showArtworkCount}
                            onChange={(e) => setShowArtworkCount(e.target.checked)}
                            color="primary"
                        />
                    }
                    label="Show artwork count"
                    style={{ marginBottom: '16px', display: 'block', textAlign: 'center' }}
                />
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <button
                        className={`${buttonStyles.button} ${buttonStyles.medium}`}
                        onClick={() => {
                            setIsCreateModalOpen(true);
                            setCurrentListName(''); // Reset list name when creating a new list
                        }}
                        style={{ marginRight: '10px' }}
                    >
                        Create New List
                    </button>
                    <button
                        className={`${buttonStyles.button} ${buttonStyles.medium}`}
                        onClick={handleCloseModal}
                    >
                        Close
                    </button>
                </div>
    
                {/* Create List Modal */}
                <CreateListModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    userId={userId}
                    onCreate={(newListData) => {
                        fetch('/api/curation/user', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ userId, name: newListData.name }),
                        })
                            .then((response) => response.json())
                            .then((newList) => {
                                setCurationLists([...curationLists, { ...newList, artworkCount: 0 }]);
                                setIsCreateModalOpen(false);
                            })
                            .catch((error) => console.error('Error creating list:', error));
                    }}
                    setIsAnyModalOpen={setIsAnyModalOpen}
                />
    
                {/* Rename List Modal */}
                <RenameListModal
                    isOpen={isRenameModalOpen}
                    onClose={handleCloseRenameModal}
                    userId={userId}
                    listId={renameListInfo?.id ?? null}
                    initialName={renameListInfo?.name ?? ''}
                    onRename={(updatedListData) => {
                        console.log("onRename called with:", updatedListData);
                        fetch(`/api/curation/user/${updatedListData.id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(updatedListData),
                        })
                            .then((response) => response.json())
                            .then((updatedList) => {
                                console.log("List updated successfully:", updatedList);
                                setCurationLists((prev) =>
                                    prev.map((list) =>
                                        list.id === updatedList.id ? { ...list, name: updatedList.name } : list
                                    )
                                );
                                handleCloseRenameModal();
                            })
                            .catch((error) => console.error('Error renaming list:', error));
                    }}
                    setIsAnyModalOpen={setIsAnyModalOpen}
                />
            </Box>
        </Modal>
    );
};

export default CurationListModal;