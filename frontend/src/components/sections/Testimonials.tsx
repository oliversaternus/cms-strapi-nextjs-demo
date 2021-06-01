import React, { useMemo, useEffect, useCallback, useState } from "react";
import clsx from "clsx";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Avatar, Theme, Fade } from "@material-ui/core";
import { TestimonialsSection, TestimonialsSectionItem } from '../../tools/Models';
import { parse } from 'marked';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';

interface TestimonialsProps {
    testimonials: TestimonialsSection;
    style?: React.CSSProperties;
    className?: string;
}

interface TestimonialsItemProps {
    item: TestimonialsSectionItem;
    style?: React.CSSProperties;
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
        overflow: 'hidden'
    },
    container: {
        width: '100%',
        maxWidth: 640,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },
    quoteContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    quoteContent: {
        paddingTop: 18,
        textAlign: 'center',
        opacity: 0.8
    },
    quoteIcon: {
        width: 48,
        height: 48,
        fill: theme.palette.sectionStyles.quote?.textLight || theme.palette.text.hint,
        opacity: 0.4
    },
    authorContainer: {
        padding: 24,
        display: 'flex',
        alignItems: 'center'
    },
    authorInnerContainer: {
        padding: 12
    },
    author: {
        fontSize: 20,
        fontWeight: 500,
        color: theme.palette.sectionStyles.quote?.text || theme.palette.text.primary
    },
    company: {
        fontSize: 14,
        fontWeight: 400,
        color: theme.palette.sectionStyles.quote?.text || theme.palette.text.primary
    },
    avatar: {
        width: 64,
        height: 64
    },
    '@media (max-width: 1000px)': {
        textContent: {
            width: '100%'
        },
        headline: {
            width: '100%',
            paddingBottom: 24
        }
    },
    '@media (max-width: 800px)': {
        root: {
            padding: 32,
            paddingTop: 48,
            paddingBottom: 48
        }
    }
}));

const TestimonialsItem: React.FC<TestimonialsItemProps> = (props) => {
    const { item, ...others } = props;
    const { content, author, image, company } = item;
    const classes = useStyles();
    const parsedContent = useMemo(() => parse(content || ''), [content]);

    return (
        <div className={classes.quoteContainer} {...others}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 8 8" className={classes.quoteIcon}>
                <path d="M3,1.3C2,1.7,1.2,2.7,1.2,3.6c0,0.2,0,0.4,0.1,0.5c0.2-0.2,0.5-0.3,0.9-0.3c0.8,0,1.5,0.6,1.5,1.5c0,0.9-0.7,1.5-1.5,1.5     C1.4,6.9,1,6.6,0.7,6.1C0.4,5.6,0.3,4.9,0.3,4.5c0-1.6,0.8-2.9,2.5-3.7L3,1.3z M7.1,1.3c-1,0.4-1.8,1.4-1.8,2.3     c0,0.2,0,0.4,0.1,0.5c0.2-0.2,0.5-0.3,0.9-0.3c0.8,0,1.5,0.6,1.5,1.5c0,0.9-0.7,1.5-1.5,1.5c-0.7,0-1.1-0.3-1.4-0.8     C4.4,5.6,4.4,4.9,4.4,4.5c0-1.6,0.8-2.9,2.5-3.7L7.1,1.3z"></path>
            </svg>
            <div className={classes.quoteContent} dangerouslySetInnerHTML={{ __html: parsedContent }} />
            <div className={classes.authorContainer}>
                <Avatar
                    key={item.id}
                    className={classes.avatar}
                    alt={author}
                    src={image?.formats?.thumbnail?.url}
                />
                <div className={classes.authorInnerContainer}>
                    <div className={classes.author}>{author}</div>
                    {company && <div className={classes.company}>{company}</div>}
                </div>
            </div>
        </div>
    );
};

const TestimonialsItemWrapper: React.FC<{ item: TestimonialsSectionItem, visible: boolean }> = ({ item, visible }) => {
    return (
        <Fade in={visible} timeout={{ enter: 1000, exit: 100 }}>
            <TestimonialsItem item={item} />
        </Fade>
    );
};

const Testimonials: React.FC<TestimonialsProps> = (props) => {
    const { className, style, testimonials } = props;
    const classes = useStyles();
    const [selected, setSelected] = useState(testimonials.testimonials[0]);
    const [visible, setVisible] = useState(false);
    const debouncedSelected = useDebouncedValue(selected, 200);
    const parsedHeading = useMemo(() => parse(testimonials.heading || ''), [testimonials]);

    const selectNext = () => {
        if (testimonials.testimonials.length === 0) {
            return;
        }
        setVisible(false);
        const currentIndex = testimonials.testimonials.findIndex(testimonial => testimonial.id === selected.id);
        if (currentIndex !== -1 && currentIndex + 1 < testimonials.testimonials.length) {
            setSelected(testimonials.testimonials[currentIndex + 1]);
        } else {
            setSelected(testimonials.testimonials[0]);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(selectNext, 12000);
        return () => clearTimeout(timeout);
    }, [selectNext]);

    useEffect(() => {
        const timeout = setTimeout(() => setVisible(true), 100);
        return () => clearTimeout(timeout);
    }, [debouncedSelected]);

    return (
        <section
            style={style}
            className={clsx(classes.root, className, 'section-testimonials')}
            id={testimonials.identifier}
        >
            {testimonials.heading &&
                <div dangerouslySetInnerHTML={{ __html: parsedHeading }} />}
            <div className={clsx(classes.container)}>
                <TestimonialsItemWrapper visible={visible} item={debouncedSelected} />
            </div>
        </section>
    );
};

export default Testimonials;