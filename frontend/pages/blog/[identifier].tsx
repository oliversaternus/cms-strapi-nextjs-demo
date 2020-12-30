import React, { useMemo, useEffect, useContext } from 'react';
import { NextPage } from 'next';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { getPost } from '../../src/tools/Service';
import { Post } from '../../src/tools/Models';
import { parse } from 'marked';
import { CircularProgress, Avatar } from '@material-ui/core';
import { useRouter } from 'next/router';
import { NotificationContext } from '../../src/contexts/NotificationContext';
import Image from '../../src/components/styledComponents/StyledImage';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column'
        },
        header: {
            width: '100%',
            height: 340,
            paddingLeft: 32,
            paddingRight: 32,
            maxWidth: 1080,
            display: 'flex',
            flexWrap: 'wrap'
        },
        titleContainer: {
            fontSize: 32,
            width: '40%',
            paddingRight: 16,
            minWidth: 240,
        },
        title: {
            fontSize: 32
        },
        meta: {
            paddingTop: 24,
            paddingBottom: 24,
            fontSize: 16,
            position: 'relative',
            display: 'flex',
            '&:before': {
                content: '""',
                borderRadius: 3,
                display: 'block',
                height: 5,
                width: 110,
                backgroundColor: theme.palette.primary.main,
                position: 'absolute',
                top: 0,
                left: 0
            }
        },
        topic: {
            fontWeight: 600,
        },
        divider: {
            paddingLeft: 4,
            paddingRight: 4
        },
        duration: {},
        image: {
            width: '60%',
            minWidth: 240,
            minHeight: 160
        },
        author: {
            fontSize: 18,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 32
        },
        avatarContainer: {
            width: 48,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 24,
            marginRight: 12,
            border: `2px solid ${theme.palette.primary.main}`
        },
        avatar: {
            width: 40,
            height: 40
        },
        authorName: {
            marginLeft: 4
        },
        '@media (max-width: 800px)': {
            titleContainer: {
                width: '100%',
                paddingRight: 0
            },
            image: {
                marginTop: 24,
                width: '100%'
            },
            header: {
                height: 'auto'
            }
        }
    }),
);

const PostPage: NextPage<{ post: Post }> = ({ post }) => {
    const { content, image, title, subtitle, author, topic, duration } = post;
    const classes = useStyles();
    const parsedContent = useMemo(() => parse(content || ''), [content]);
    const { openNotification } = useContext(NotificationContext);
    const router = useRouter();

    useEffect(() => {
        if (title === '__empty' && content === '__empty') {
            openNotification('error', 'Post not found.');
            router.replace('/blog');
        }
    }, [title, content]);

    if (title === '__empty' && content === '__empty') {
        return (
            <div className="loading-overlay">
                <CircularProgress color="secondary" />
            </div>
        );
    }

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <div className={classes.titleContainer}>
                    <div className={classes.meta}>
                        <div className={classes.topic}>
                            {(topic || '').toUpperCase()}
                        </div>
                        <div className={classes.divider}>|</div>
                        <div className={classes.duration}>
                            {duration + ' MIN. LESEDAUER'}
                        </div>
                    </div>
                    <div className={classes.title}>
                        {`${title}${subtitle ? ` - ${subtitle}` : ''}`}
                    </div>
                    {author && <div className={classes.author}>
                        <div className={classes.avatarContainer}>
                            <Avatar
                                alt={author.name}
                                src={author.image?.formats?.thumbnail?.url}
                                className={classes.avatar}
                            />
                        </div>
                        <div>
                            <div style={{ display: 'flex' }}>
                                <div>Verfasst von</div>
                                <div className={classes.authorName}>{author.name}</div>
                            </div>
                            {author.twitter &&
                                <a
                                    href={`https://twitter.com/${author.twitter}`}
                                >{`@${author.twitter}`}
                                </a>
                            }
                        </div>
                    </div>}
                </div>
                {image && <Image className={classes.image} src={image?.url || ''} previewUrl={image?.previewUrl} />}
            </div>
            <div className={'blog-page'} dangerouslySetInnerHTML={{ __html: parsedContent }} />
        </div>
    );
}

PostPage.getInitialProps = async ({ query }): Promise<{ post: Post }> => {
    const postResponse = await getPost(query.identifier + '');
    const post: Post = (!postResponse.isError && postResponse.data) || { content: '__empty', title: '__empty' } as Post;

    return { post };
}

export default PostPage;
