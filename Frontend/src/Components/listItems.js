import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NoteIcon from '@mui/icons-material/Note'; export const mainListItems = (

    <React.Fragment>
        <ListItemButton>
            <ListItemIcon>
                <NoteIcon style={{ fontSize: 30 }} />
            </ListItemIcon>
            <ListItemText primary="Notes" />
        </ListItemButton>
    </React.Fragment>
);

