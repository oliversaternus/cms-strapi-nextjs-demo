import React, { useMemo, useRef, useEffect } from "react";
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

// declare some typing for vanilla JS class
declare class FsLightbox {
    props: {
        sources: string[];
        [key: string]: any;
    };
    open: (index?: number) => void;
    [key: string]: any;
};

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        width: '100%',
        padding: 48,
        paddingTop: 48,
        paddingBottom: 48,
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
    clickable: {
        cursor: 'pointer',
        '&:hover': {
            transform: 'scale(1.048)'
        }
    },
    breaker: {
        width: '0%'
    },
    heading: {
        paddingBottom: 24
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
            paddingBottom: 48,
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
    const lightBoxRef = useRef<FsLightbox | null>(null);

    useEffect(() => {
        const initialize = async () => {
            // dynamically load vanilla JS module
            await import('../../../external/fslightbox/fslightbox');
            const lightbox = new FsLightbox();
            lightbox.props.sources = gallery.images?.map(image => (image.url)) || [];
            lightBoxRef.current = lightbox;
        }
        initialize();
    }, [gallery]);

    const handleClick = (index: number) => () => {
        lightBoxRef.current?.open?.(index);
    };

    return (
        <section
            style={style}
            className={clsx(classes.root, className, 'section-gallery')}
            id={gallery.identifier}
        >
            {gallery.heading &&
                <div className={classes.heading} dangerouslySetInnerHTML={{ __html: parsedHeading }} />}
            <div className={classes.container}>
                {gallery.images?.map((image, index) =>
                    <div key={image.id} className={clsx(classes.item, index % 6 === 1 ? classes.square : classes.rect)}>
                        <div className={classes.imageContainer} onClick={handleClick(index)}>
                            <Image
                                className={clsx(classes.image, classes.clickable)}
                                src={image.url}
                                previewUrl={image.previewUrl}
                            />
                        </div>
                    </div>
                )}
            </div >
        </section>
    );
};

export default Gallery;