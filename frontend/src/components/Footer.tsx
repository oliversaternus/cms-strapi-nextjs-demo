import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Link from 'next/link';
import { NavigationArea } from '../tools/Models';

type FooterProps = {
    columns?: NavigationArea;
    logoSrc?: string;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            backgroundColor: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        container: {
            width: '100%',
            maxWidth: 1080,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingTop: 32,
            paddingBottom: 32,
            fontSize: 14,
            minHeight: 84,
        },
        column: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            padding: 32
        },
        logoImage: {
            height: 32,
            marginRight: 8
        },
        brandName: {
            color: theme.palette.primary.main,
            fontSize: 16,
            fontWeight: 300,
            lineHeight: 1
        },
        brandName2: {
            color: theme.palette.secondary.main,
            fontWeight: 400,
            fontSize: 18
        },
        title: {
            color: theme.palette.text.secondary,
            fontSize: 18,
            fontWeight: 500,
            marginBottom: 8,
            display: 'flex',
            alignItems: 'center'
        },
        link: {
            fontSize: 14,
            fontWeight: 300,
            color: theme.palette.text.primary,
            userSelect: 'none',
            WebkitTapHighlightColor: 'transparent',
            transition: 'color 0.16s linear',
            '&:hover': {
                color: theme.palette.text.hint,
                textDecoration: 'none'
            }
        },
        '@media (max-width: 800px)': {
            container: {
                flexDirection: 'column'
            }
        }
    }),
);

const Footer: React.FC<FooterProps> = ({ columns, logoSrc }) => {
    const classes = useStyles();
    return (
        <>
            <div className={classes.root}>
                <div className={classes.container}>
                    <div className={classes.column}>
                        <div className={classes.title}>
                            <img src={logoSrc} className={classes.logoImage} />
                        </div>
                    </div>
                    {columns?.map(column =>
                        <React.Fragment key={column.id}>
                            <div className={classes.column}>
                                <div className={classes.title}>{column.title}</div>
                                {column.links?.map(link =>
                                    <Link href={link.path + ''} key={link.id}>
                                        <a className={classes.link}>{link.link}</a>
                                    </Link>
                                )}
                            </div>
                        </ React.Fragment>
                    )}
                </div>
            </div>
        </>
    );
}

export default Footer;