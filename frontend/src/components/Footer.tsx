import React, { useMemo } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Link from 'next/link';
import { NavigationArea } from '../tools/Models';
import { parse } from 'marked';

type FooterProps = {
    columns?: NavigationArea;
    logoSrc?: string;
    copyright?: string;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            backgroundColor: theme.palette.componentStyles.footer?.background || theme.palette.backgrounds.main,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
        },
        container: {
            width: '100%',
            maxWidth: 1080,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingTop: 32,
            paddingBottom: 32,
            fontSize: 14,
            minHeight: 84,
        },
        subFooter: {
            padding: 16,
            paddingBottom: 24,
            maxWidth: 1080,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'column'
        },
        column: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            padding: 32
        },
        logoImage: {
            height: 84,
            marginRight: 8
        },
        title: {
            color: theme.palette.componentStyles.footer?.textStrong || theme.palette.text.secondary,
            fontSize: 18,
            fontWeight: 600,
            marginBottom: 8,
            display: 'flex',
            alignItems: 'center'
        },
        link: {
            fontSize: 16,
            fontWeight: 400,
            marginTop: 6,
            marginBottom: 6,
            color: theme.palette.componentStyles.footer?.text || theme.palette.text.primary,
            userSelect: 'none',
            WebkitTapHighlightColor: 'transparent',
            transition: 'color 0.16s linear',
            '&:hover': {
                color: theme.palette.componentStyles.footer?.textLight || theme.palette.text.hint,
                textDecoration: 'none'
            }
        },
        '@media (max-width: 800px)': {
            container: {
                flexDirection: 'column',
                alignItems: 'center'
            }
        }
    }),
);

const Footer: React.FC<FooterProps> = ({ columns, logoSrc, copyright }) => {
    const classes = useStyles();
    const parsedCopyright = useMemo(() => parse(copyright || ''), [copyright]);
    return (
        <>
            <div className={classes.root}>
                <div className={classes.container}>
                    {columns?.map(column =>
                        <React.Fragment key={column.id}>
                            <div className={classes.column}>
                                <div className={classes.title}>{column.title}</div>
                                {column.links?.map(link =>
                                    <Link href={link.path + ''} key={link.id}>
                                        <a target="_self" className={classes.link}>{link.caption}</a>
                                    </Link>
                                )}
                            </div>
                        </ React.Fragment>
                    )}
                </div>
                <div className={classes.subFooter}>
                    <img src={logoSrc} className={classes.logoImage} />
                    <div dangerouslySetInnerHTML={{ __html: parsedCopyright }}></div>
                </div>
            </div>
        </>
    );
}

export default Footer;