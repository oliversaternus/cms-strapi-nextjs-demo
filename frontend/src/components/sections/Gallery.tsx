import React, { useMemo } from "react";
import clsx from "clsx";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";
import { GallerySection } from '../../tools/Models';
import Image from '../styledComponents/StyledImage';
import { parse } from 'marked';

interface GalleryProps {
    gallery: GallerySection;
    style?: React.CSSProperties;
    className?: string;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        width: '100%',
        padding: 48,
        paddingTop: 96,
        paddingBottom: 96,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        background: theme.palette.sectionStyles.gallery?.background || theme.palette.backgrounds.main,
        color: theme.palette.sectionStyles.gallery?.text || theme.palette.text.primary
    },
    container: {
        width: '100%',
        maxWidth: 1016,
        display: 'flex',
        flexWrap: 'wrap'
    },
    rect: {
        flexBasis: '33.33333%',
        flexGrow: 1
    },
    square: {
        flexBasis: '20%',
        flexGrow: 1,
    },
    item: {
        padding: 4,
        height: 250
    },
    imageContainer: {
        height: '100%',
        width: '100%',
        overflow: 'hidden'
    },
    image: {
        height: '100%',
        width: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top center',
        transition: 'transform 0.225s linear'
    },
    breaker: {
        width: '0%'
    },
    heading: {
        color: theme.palette.sectionStyles.gallery?.text || theme.palette.text.primary,
        '& h1': {
            paddingTop: 6,
            paddingBottom: 6,
            margin: 0,
            fontSize: 32,
            fontWeight: 500
        },
        '& h2': {
            paddingTop: 6,
            paddingBottom: 6,
            margin: 0,
            fontSize: 32,
            fontWeight: 500
        },
        '& h3': {
            paddingTop: 6,
            paddingBottom: 6,
            margin: 0,
            fontSize: 32,
            fontWeight: 500
        },
        '& h4': {
            paddingTop: 6,
            paddingBottom: 6,
            margin: 0,
            fontSize: 32,
            fontWeight: 500
        },
        '& h5': {
            paddingTop: 6,
            paddingBottom: 6,
            margin: 0,
            fontSize: 32,
            fontWeight: 500
        },
        '& p': {
            margin: 0,
            fontSize: 16,
            fontWeight: 300,
            color: theme.palette.sectionStyles.gallery?.text || theme.palette.text.primary
        },
        '& ul': {
            margin: 0,
            paddingBottom: 32,
            fontSize: 16,
            fontWeight: 300,
            color: theme.palette.sectionStyles.gallery?.text || theme.palette.text.primary,
            paddingLeft: 18
        },
        '& ol': {
            margin: 0,
            paddingBottom: 32,
            fontSize: 16,
            fontWeight: 300,
            color: theme.palette.sectionStyles.gallery?.text || theme.palette.text.primary,
            paddingLeft: 18
        }
    },
    '@media (max-width: 1000px)': {
        rect: {
            flexBasis: '50%',
        },
        square: {
            flexBasis: '25%'
        }
    },
    '@media (max-width: 800px)': {
        root: {
            padding: 32,
            paddingTop: 48,
            paddingBottom: 48
        }
    },
    '@media (max-width: 600px)': {
        rect: {
            flexBasis: '100%',
        },
        square: {
            flexBasis: '100%'
        }
    }
}));

const Gallery: React.FC<GalleryProps> = (props) => {
    const { className, style, gallery } = props;
    const classes = useStyles();
    const parsedHeading = useMemo(() => parse(gallery.heading || ''), [gallery]);

    return (
        <div
            style={style}
            className={clsx(classes.root, className)}
            id={gallery.identifier}
        >
            {gallery.heading &&
                <div className={classes.heading} dangerouslySetInnerHTML={{ __html: parsedHeading }} />}
            <div className={classes.container}>
                {gallery.images?.map((image, index) =>
                    <div key={image.id} className={clsx(classes.item, index % 6 === 1 ? classes.square : classes.rect)}>
                        <div className={classes.imageContainer}>
                            <Image
                                className={classes.image}
                                src={image.url}
                                previewUrl={image.previewUrl}
                            />
                        </div>
                    </div>
                )}
            </div >
        </div >
    );
};

export default Gallery;