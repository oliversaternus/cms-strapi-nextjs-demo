import * as React from "react";
import clsx from "clsx";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { BannerSection } from '../../tools/Models';
import { parse } from 'marked';
import { useMemo } from "react";
import Button from '../styledComponents/StyledButton';
import Image from '../styledComponents/StyledImage';

interface BannerProps {
    banner: BannerSection;
    style?: React.CSSProperties;
    className?: string;
}

const useStyles = makeStyles((theme) => createStyles({
    root: {
        width: '100%',
        minHeight: '60vh',
        padding: 48,
        paddingTop: 128,
        paddingBottom: 128,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: '#ffffff',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'relative',
        overflow: 'hidden'
    },
    button: {
        marginTop: 12
    },
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        maxWidth: 800,
        zIndex: 2
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 0,
        top: 0,
        right: 0
    },
    imageOverlay: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 0,
        top: 0,
        right: 0,
        background: theme.palette.sectionStyles.banner?.background || theme.palette.backgrounds.main
    },
    content: {
        maxWidth: 800,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        '& h1': {
            textAlign: 'center',
            paddingTop: 6,
            paddingBottom: 6,
            margin: 0,
            fontSize: 40,
            fontWeight: 600,
            lineHeight: 1.2,
            color: theme.palette.sectionStyles.banner?.text || theme.palette.text.secondary
        },
        '& h2': {
            textAlign: 'center',
            paddingTop: 6,
            paddingBottom: 6,
            margin: 0,
            fontSize: 40,
            fontWeight: 600,
            lineHeight: 1.2,
            color: theme.palette.sectionStyles.banner?.text || theme.palette.text.secondary
        },
        '& h3': {
            textAlign: 'center',
            paddingTop: 6,
            paddingBottom: 6,
            margin: 0,
            fontSize: 32,
            fontWeight: 600,
            lineHeight: 1.2,
            color: theme.palette.sectionStyles.banner?.text || theme.palette.text.secondary
        },
        '& h4': {
            textAlign: 'center',
            paddingTop: 6,
            paddingBottom: 6,
            margin: 0,
            fontSize: 28,
            fontWeight: 600,
            lineHeight: 1.2,
            color: theme.palette.sectionStyles.banner?.text || theme.palette.text.secondary
        },
        '& h5': {
            textAlign: 'center',
            paddingTop: 6,
            paddingBottom: 6,
            margin: 0,
            fontSize: 24,
            fontWeight: 600,
            lineHeight: 1.2,
            color: theme.palette.sectionStyles.banner?.text || theme.palette.text.secondary
        },
        '& p': {
            textAlign: 'center',
            margin: 0,
            fontSize: 20,
            fontWeight: 300,
            color: theme.palette.sectionStyles.banner?.text || theme.palette.text.secondary
        },
        '& ul': {
            textAlign: 'center',
            margin: 0,
            fontSize: 20,
            fontWeight: 300,
            color: theme.palette.sectionStyles.banner?.text || theme.palette.text.secondary,
            paddingLeft: 18
        },
        '& ol': {
            textAlign: 'center',
            margin: 0,
            fontSize: 20,
            fontWeight: 300,
            color: theme.palette.sectionStyles.banner?.text || theme.palette.text.secondary,
            paddingLeft: 18
        }
    },
    '@media (max-width: 1000px)': {
        root: {
            padding: 24,
            paddingTop: 96,
            paddingBottom: 96
        }
    }
}));

const Banner: React.FC<BannerProps> = (props) => {
    const { className, banner, children } = props;
    const classes = useStyles();
    const parsedContent = useMemo(() => parse(banner.content || ''), [banner]);

    return (
        <div className={clsx(classes.root, className)} id={banner.identifier}>
            <div className={classes.container}>
                <div className={classes.content} dangerouslySetInnerHTML={{ __html: parsedContent }}>

                </div>
                {banner.button &&
                    <Button
                        className={classes.button}
                        _color='light'
                        link={banner.button?.link}
                        trackingEvent={{
                            category: 'Interaction',
                            action: 'Clicked Banner' + (banner.identifier ? ' #' + banner.identifier : ''),
                            label: banner.button.content
                        }}
                    >
                        {banner.button.content}
                    </Button>
                }
                {children}
            </div>
            {banner.image &&
                <Image
                    className={classes.imageContainer}
                    src={banner.image.url}
                    previewUrl={banner.image.previewUrl}
                />
            }
            <div className={classes.imageOverlay} />
        </div>
    );
};

export default Banner;