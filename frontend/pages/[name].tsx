import React from 'react';
import { NextPage } from 'next';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Page } from '../src/tools/Models';
import { getPage } from '../src/tools/Service';
import Error from './404';
import GenericContent from '../src/components/GenericContainer';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column'
        }
    }),
);

const GenericPage: NextPage<{ page: Page }> = ({ page }) => {
    const { id, content } = page;
    const classes = useStyles();

    if (!id) {
        return <Error />;
    }

    return <GenericContent className={classes.root} content={content} />;
}

GenericPage.getInitialProps = async ({ query }): Promise<{ page: Page }> => {
    const pageResponse = await getPage(query?.name + '');
    const page: Page = (!pageResponse.isError && pageResponse.data) || {};

    return { page };
}

export default GenericPage;