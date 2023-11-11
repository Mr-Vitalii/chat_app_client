import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";

import {
    StyledBox,
    DropContainer,
    FilePreview,
    RejectedFiles,
    Container,
    StyledListItem,
    DeleteButton,
    ErrorsContainer,
} from "./styled-components";

import { Box, List, ListItem, Typography } from "@mui/material";

import { getErrorMessage } from "utils/helpers/getErrorMessage";

import { instance, instanceAuth, setAuthHeader } from "utils/axios";

import { ChatState } from "context/ChatProvider";

import { AppLoadingButton } from "components/global/AppLoadingButton/AppLoadingButton";

export const SetAvatar = () => {
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const [file, setFile] = useState(null);
    const [rejected, setRejected] = useState([]);
    const [picLoading, setPicLoading] = useState(false);

    const { user } = ChatState();

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if (acceptedFiles.length === 1) {
            const acceptedFile = acceptedFiles[0];
            setFile(
                Object.assign(acceptedFile, {
                    preview: URL.createObjectURL(acceptedFile),
                }),
            );
        } else {
            setRejected(rejectedFiles);
        }
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            "image/*": [],
        },
        maxSize: 1024 * 1000,
        maxFiles: 1,
        onDrop,
    });

    const removeFile = () => {
        setFile(null);
    };

    const removeRejected = () => {
        setRejected([]);
    };

    const handleClick = async (e) => {
        if (!file) {
            toast.error("You need to add an avatar first", toastOptions);
            return;
        }

        if (file) {
            setPicLoading(true);
            const formData = new FormData();
            formData.append("avatar", file);
            try {
                console.log(formData);
                console.log(file);

                // await dispatch(updateAvatar(formData)).unwrap();
                setPicLoading(false);
                toast.success("File uploaded", toastOptions);
                setFile(null);
            } catch (e) {
                toast.error(getErrorMessage(e), toastOptions);
            }
        }
    };

    return (
        <Container>
            <StyledBox>
                <DropContainer {...getRootProps()}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <Typography variant="body1">
                            Drop the files here ...
                        </Typography>
                    ) : (
                        <Box>
                            <Typography variant="body1">
                                Drag 'n' drop some file here, or click to select
                                file
                            </Typography>
                            <Typography variant="caption">
                                File size should not exceed 1 Mb
                            </Typography>
                        </Box>
                    )}
                </DropContainer>

                <FilePreview>
                    {file && (
                        <>
                            <img
                                src={file.preview}
                                alt={file.name}
                                onLoad={() => {
                                    URL.revokeObjectURL(file.preview);
                                }}
                            />
                            <DeleteButton type="button" onClick={removeFile}>
                                Delete
                            </DeleteButton>
                            <Typography variant="body2">{file.name}</Typography>
                        </>
                    )}
                </FilePreview>
                <RejectedFiles>
                    {rejected && (
                        <List>
                            {rejected.map(({ file, errors }) => (
                                <StyledListItem key={file.name}>
                                    <ErrorsContainer>
                                        <Typography variant="body1">
                                            Unable to upload file {file.name}
                                        </Typography>
                                        <List sx={{ p: 0 }}>
                                            {errors.map((error) => (
                                                <ListItem
                                                    key={error.code}
                                                    sx={{ p: 0 }}
                                                >
                                                    {error.message}
                                                </ListItem>
                                            ))}
                                        </List>
                                    </ErrorsContainer>
                                    <DeleteButton
                                        type="button"
                                        onClick={removeRejected}
                                    >
                                        Delete
                                    </DeleteButton>
                                </StyledListItem>
                            ))}
                        </List>
                    )}
                </RejectedFiles>
                <AppLoadingButton
                    loading={picLoading}
                    sx={{ mx: "auto" }}
                    type="button"
                    onClick={handleClick}
                >
                    Upload file
                </AppLoadingButton>
            </StyledBox>
        </Container>
    );
};
