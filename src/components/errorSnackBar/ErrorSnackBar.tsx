import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useAppSelector} from "../../hooks/hooks";
import {setAppErrorAC} from '../../app/app-reducer';
import {useDispatch} from 'react-redux';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function CustomizedSnackbars() {

    const error = useAppSelector(state => state.app.error)
    const dispatch = useDispatch()


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        } else {
            dispatch(setAppErrorAC({error: null}))
        }


        // setOpen(false);
    };
    const isOpen = error !== null
    return (
        <Stack spacing={2} sx={{width: '100%'}}>
            <Snackbar open={isOpen} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                    {error !== '' ? error : 'Some Error!!!'}
                </Alert>
            </Snackbar>
        </Stack>
    );
}