import * as React from "react";
import clsx from "clsx";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Theme, Avatar } from "@material-ui/core";
import { CardsSection, CardsSectionItem } from '../../tools/Models';
import { parse } from 'marked';
import { useMemo } from "react";
import Button from '../styledComponents/StyledButton';

interface CardsProps {
    cards: CardsSection;
    style?: React.CSSProperties;
    className?: string;
}

interface CardsItemProps {
    item: CardsSectionItem;
    identifier?: string;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        width: '100%',
        paddingTop: 96,
        paddingBottom: 96,
        background: theme.palette.sectionStyles.cards?.background || theme.palette.backgrounds.main,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        width: '100%',
        maxWidth: 1016,
        display: 'flex',
        alignItems: 'stretch',
        flexWrap: 'wrap',
        color: theme.palette.sectionStyles.cards?.text || theme.palette.text.primary
    },
    heading: {
        width: '100%',
        maxWidth: 1016,
        padding: 24,
        paddingTop: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 48,
        color: theme.palette.sectionStyles.cards?.text || theme.palette.text.primary,
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
            color: theme.palette.sectionStyles.cards?.text || theme.palette.text.primary
        },
        '& ul': {
            margin: 0,
            paddingBottom: 32,
            fontSize: 16,
            fontWeight: 300,
            color: theme.palette.sectionStyles.cards?.text || theme.palette.text.primary,
            paddingLeft: 18
        },
        '& ol': {
            margin: 0,
            paddingBottom: 32,
            fontSize: 16,
            fontWeight: 300,
            color: theme.palette.sectionStyles.cards?.text || theme.palette.text.primary,
            paddingLeft: 18
        }
    },
    '@media (max-width: 800px)': {
        root: {
            padding: 32,
            paddingTop: 48,
            paddingBottom: 48
        },
        heading: {
            paddingBottom: 24
        }
    }
}));

const useCardStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        padding: 16,
        flex: '0 0 100%',
        maxWidth: '100%'
    },
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 24,
        borderRadius: 4,
        transition: 'transform 0.18s ease-in'
    },
    image: {
        height: 86,
        marginBottom: 16,
        opacity: 0.8
    },
    cardContent: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& h1': {
            paddingTop: 6,
            paddingBottom: 12,
            margin: 0,
            textAlign: 'center',
            fontSize: 24,
            fontWeight: 400,
            lineHeight: 1.2,
            color: theme.palette.sectionStyles.cards?.text || theme.palette.text.primary
        },
        '& h2': {
            paddingTop: 6,
            paddingBottom: 12,
            margin: 0,
            textAlign: 'center',
            fontSize: 24,
            fontWeight: 400,
            lineHeight: 1.2,
            color: theme.palette.sectionStyles.cards?.text || theme.palette.text.primary
        },
        '& h3': {
            paddingTop: 6,
            paddingBottom: 12,
            margin: 0,
            textAlign: 'center',
            fontSize: 24,
            fontWeight: 400,
            lineHeight: 1.2,
            color: theme.palette.sectionStyles.cards?.text || theme.palette.text.primary
        },
        '& h4': {
            paddingTop: 6,
            paddingBottom: 12,
            margin: 0,
            textAlign: 'center',
            fontSize: 24,
            fontWeight: 400,
            lineHeight: 1.2,
            color: theme.palette.sectionStyles.cards?.text || theme.palette.text.primary
        },
        '& h5': {
            paddingTop: 6,
            paddingBottom: 12,
            margin: 0,
            textAlign: 'center',
            fontSize: 24,
            fontWeight: 400,
            lineHeight: 1.2,
            color: theme.palette.sectionStyles.cards?.text || theme.palette.text.primary
        },
        '& p': {
            margin: 0,
            fontSize: 16,
            textAlign: 'center',
            fontWeight: 300,
            color: theme.palette.sectionStyles.cards?.text || theme.palette.text.primary
        },
        '& ul': {
            margin: 0,
            paddingBottom: 32,
            fontSize: 16,
            textAlign: 'center',
            fontWeight: 300,
            color: theme.palette.sectionStyles.cards?.text || theme.palette.text.primary,
            paddingLeft: 18
        },
        '& ol': {
            margin: 0,
            paddingBottom: 32,
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 300,
            color: theme.palette.sectionStyles.cards?.text || theme.palette.text.primary,
            paddingLeft: 18
        }
    },
    buttonContainer: {
        marginTop: 24,
        display: 'flex',
        justifyContent: 'center'
    },
    avatar: {
        width: 86,
        height: 86,
        marginBottom: 12
    },
    avatarContainer: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    '@media (min-width: 600px)': {
        root: {
            flex: '0 0 50%',
            maxWidth: '50%',
        }
    },
    '@media (min-width: 1000px)': {
        root: {
            flex: '0 0 33.3333333333%',
            maxWidth: '33.3333333333%',
        }
    }
}));

const CardItem: React.FC<CardsItemProps> = (props) => {
    const { item, identifier } = props;
    const classes = useCardStyles();
    const parsedContent = useMemo(() => parse(item.content || ''), [item]);
    return (
        <div className={classes.root}>
            <div className={classes.container}>
                {item.image && (item.variant === 'person' ? <div className={classes.avatarContainer}><Avatar className={classes.avatar} src={item.image.url} /></div> : <img className={classes.image} src={item.image.url} />)}
                <div className={classes.cardContent} dangerouslySetInnerHTML={{ __html: parsedContent }}></div>
                {item.link && item.linkText && <div className={classes.buttonContainer}>
                    <Button
                        link={item.link}
                        _color='primary'
                        trackingEvent={{
                            category: 'Interaction',
                            action: 'Clicked Card' + (identifier ? ' #' + identifier : ''),
                            label: item.link
                        }}
                    >
                        {item.linkText}
                    </Button></div>}
            </div>
        </div>
    );
};

const Cards: React.FC<CardsProps> = (props) => {
    const { className, style, cards } = props;
    const heading = cards?.heading;
    const classes = useStyles();
    const parsedContent = useMemo(() => parse(heading || ''), [heading]);
    return (
        <div style={style} className={clsx(classes.root, className)} id={cards.identifier}>
            <div className={classes.heading} dangerouslySetInnerHTML={{ __html: parsedContent }}></div>
            <div className={classes.content} >
                {cards.cards.map(item => <CardItem key={item.id} item={item} identifier={cards.identifier} />)}
            </div>
        </div>
    );
};

export default Cards;