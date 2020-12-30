import React, { useEffect } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            height: 'calc(100vh - 305px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
        },
        loading: {
            margin: 64
        },
    }),
);

const Error: React.FC<{}> = () => {
    const classes = useStyles();
    const router = useRouter();

    useEffect(() => {
        router.replace('/');
    }, []);

    return (
        <div className={classes.root}>
             <CircularProgress color='secondary' className={classes.loading} />
        </div>
    );
}

export default Error;
