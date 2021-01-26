import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Img } from 'react-image';
import Fade from '@material-ui/core/Fade';

interface ImageProps {
    src: string;
    style?: React.CSSProperties;
    className?: string;
    backgroundColor?: string;
    previewUrl?: string;
}

const useStyles = makeStyles(() => createStyles({
    container: {
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden'
    },
    background: {
        backgroundColor: (p: { backgroundColor?: string }) => (p.backgroundColor || 'rgba(0,0,0,0)'),
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'blur(24px)',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)'
    },
    image: {
        objectFit: 'cover',
        position: 'absolute',
        left: '50%',
        top: '50%',
        height: '100%',
        width: '100%',
        transform: 'translate(-50%,-50%)'
    },
    innerContainer: {
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden'
    }
}));

const Image: React.FC<ImageProps> = (props) => {
    const { src, className, style, backgroundColor, previewUrl } = props;
    const classes = useStyles({ backgroundColor });

    return (
        <div className={className}>
            <div className={classes.container}>
                <div className={classes.background} style={{ backgroundImage: previewUrl ? `url(${previewUrl})` : undefined, ...style }}></div>
                <Img
                    key={src}
                    style={style}
                    src={src}
                    className={classes.image}
                    container={(children) => {
                        return (
                            <Fade timeout={1000} in={true}>
                                <div className={classes.innerContainer}>
                                    {children}
                                </div>
                            </Fade>
                        )
                    }}
                />

            </div>
        </div>
    );
};

export default Image;