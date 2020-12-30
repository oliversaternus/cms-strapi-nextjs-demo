import React, { useState, useCallback, useMemo } from 'react';
import { NextPage } from 'next';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Post, PostQuery, Blog, Page, BannerSection } from '../../src/tools/Models';
import { getPosts, getPage } from '../../src/tools/Service';
import Link from 'next/link';
import Image from '../../src/components/styledComponents/StyledImage';
import Search from '../../src/components/styledComponents/StyledSearch';
import { Button, CircularProgress } from '@material-ui/core';
import clsx from 'clsx';
import { useInfiniteItems } from '../../src/hooks/useInfiniteItems';
import { parse } from 'marked';

type PageIntialProps = {
    initialPosts: Post[];
    page: Page;
};

const defaultPageSize = 10;

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
            minHeight: '60vh',
            width: '100%',
            padding: 48,
            paddingTop: 128,
            paddingBottom: 128,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            color: theme.palette.text.secondary,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            position: 'relative',
            overflow: 'hidden'
        },
        headerContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            maxWidth: 1016,
            zIndex: 2
        },
        headerContent: {
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
                color: '#ffffff'
            },
            '& h2': {
                textAlign: 'center',
                paddingTop: 6,
                paddingBottom: 6,
                margin: 0,
                fontSize: 40,
                fontWeight: 600,
                lineHeight: 1.2,
                color: '#ffffff'
            },
            '& h3': {
                textAlign: 'center',
                paddingTop: 6,
                paddingBottom: 6,
                margin: 0,
                fontSize: 32,
                fontWeight: 600,
                lineHeight: 1.2,
                color: '#ffffff'
            },
            '& h4': {
                textAlign: 'center',
                paddingTop: 6,
                paddingBottom: 6,
                margin: 0,
                fontSize: 28,
                fontWeight: 600,
                lineHeight: 1.2,
                color: '#ffffff'
            },
            '& h5': {
                textAlign: 'center',
                paddingTop: 6,
                paddingBottom: 6,
                margin: 0,
                fontSize: 24,
                fontWeight: 600,
                lineHeight: 1.2,
                color: '#ffffff'
            },
            '& p': {
                textAlign: 'center',
                margin: 0,
                fontSize: 20,
                fontWeight: 300,
                color: 'rgba(255,255,255,1)'
            },
            '& ul': {
                textAlign: 'center',
                margin: 0,
                fontSize: 20,
                fontWeight: 300,
                color: 'rgba(255,255,255,1)',
                paddingLeft: 18
            },
            '& ol': {
                textAlign: 'center',
                margin: 0,
                fontSize: 20,
                fontWeight: 300,
                color: 'rgba(255,255,255,1)',
                paddingLeft: 18
            }
        },
        headerTitle: {
            textShadow: '0px 0px 16px rgba(64, 81, 102,.8)',
            paddingTop: 6,
            paddingBottom: 6,
            margin: 0,
            fontSize: 40,
            fontWeight: 600,
            lineHeight: 1.2,
            color: '#ffffff'
        },
        subHeader: {
            textShadow: '0px 0px 16px rgba(64, 81, 102,.8)',
            margin: 0,
            fontSize: 20,
            fontWeight: 300,
            color: '#ffffff'
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
            backgroundImage: 'linear-gradient(150deg,rgba(64, 81, 102,.9) 0%,rgba(64, 81, 102,.85) 100%)'
        },
        search: {
            marginTop: 16
        },
        container: {
            backgroundColor: '#ffffff',
            minHeight: '40vh',
            width: '100%',
            maxWidth: 1080,
            padding: 24,
            display: 'flex',
            flexWrap: 'wrap'
        },
        reloadingContainer: {
            alignItems: 'center',
            justifyContent: 'center'
        },
        card: {
            color: theme.palette.text.primary,
            position: 'relative',
            borderRadius: 4,
            overflow: 'hidden',
            width: 'calc(50% - 16px)',
            margin: 8,
            height: 480,
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
            transition: 'transform 0.18s ease-in, box-shadow 0.18s ease-in',
            boxShadow: '0px 0px 32px rgba(0,0,0,0)',
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0px 0px 32px rgba(0,0,0,0.12)',
                textDecoration: 'none',
                color: theme.palette.text.primary
            }
        },
        postImage: {
            width: '100%',
            height: 260
        },
        postTitle: {
            fontSize: 24,
            padding: 18,
            paddingBottom: 64,
            fontWeight: 400,
            textOverflow: 'ellipsis',
            display: 'block',
            overflow: 'hidden',
            height: 260,
            width: '100%',
        },
        meta: {
            position: 'absolute',
            fontWeight: 400,
            bottom: 18,
            left: 18,
            fontSize: 14,
            display: 'flex'
        },
        topic: {
            fontWeight: 600,
        },
        divider: {
            paddingLeft: 4,
            paddingRight: 4
        },
        duration: {},
        loading: {
            margin: 64
        },
        loadButton: {
            margin: 32
        },
        '@media (max-width: 800px)': {
            card: {
                width: 'calc(100% - 16px)',
                height: 'auto',
                minHeight: 480
            },
            postTitle: {
                height: 'auto',
                minHeight: 260
            },
            container: {
                flexDirection: 'column'
            },
            header: {
                padding: 24,
                paddingTop: 96,
                paddingBottom: 96
            }
        }
    }),
);

const Index: NextPage<PageIntialProps> = ({ page, initialPosts }) => {
    const classes = useStyles();
    const [searchTerm, setSearchTerm] = useState('');

    const bannerSection = useMemo(() => page.content?.find(section => section.__component === 'section.banner') as BannerSection | undefined, [page]);

    const parsedContent = useMemo(() => parse(bannerSection?.content || ''), [bannerSection]);

    const postQuery: PostQuery = useMemo(() => {
        return {
            ...(searchTerm && { _q: searchTerm }),
            _sort: 'created_at:DESC'
        };
    }, [searchTerm]);

    const loadPosts = useCallback((page, pageSize) =>
        getPosts({ ...postQuery, _start: page * pageSize, _limit: pageSize }), [postQuery]);

    const { items, reloadItems, loadNextItems, pageLimitReached, isReloading, isLoading } = useInfiniteItems(loadPosts, initialPosts, defaultPageSize);

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <div className={classes.headerContainer}>
                    <div className={classes.headerContent} dangerouslySetInnerHTML={{ __html: parsedContent }}>

                    </div>
                    <Search
                        onAccept={reloadItems}
                        className={classes.search}
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
                {bannerSection?.image &&
                    <>
                        <Image
                            className={classes.imageContainer}
                            src={bannerSection?.image.url}
                            previewUrl={bannerSection?.image.previewUrl}
                        />
                        <div className={classes.imageOverlay} />
                    </>
                }
            </div>
            <div className={clsx(classes.container, isReloading && classes.reloadingContainer)}>
                {isReloading ?
                    <CircularProgress className={classes.loading} color='secondary' /> :
                    <>
                        {items.map((post) => (
                            <Link key={post.id} href={`/blog/${post.identifier}`}>
                                <a className={classes.card}>
                                    <Image className={classes.postImage} src={post.image?.formats?.small?.url || post.image?.url} />
                                    <div className={classes.postTitle}>
                                        {`${post.title}${post.subtitle ? ' - ' + post.subtitle : ''}`}
                                    </div>
                                    <div className={classes.meta}>
                                        <div className={classes.topic}>
                                            {(post.topic || '').toUpperCase()}
                                        </div>
                                        <div className={classes.divider}>|</div>
                                        <div className={classes.duration}>
                                            {post.duration + ' MIN. LESEDAUER'}
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        ))}
                    </>}
            </div>
            {isLoading && <CircularProgress className={classes.loading} color='secondary' />}
            {!isLoading && !isReloading && !pageLimitReached &&
                <Button
                    className={classes.loadButton}
                    onClick={loadNextItems}
                    variant="contained"
                    color="secondary"
                >load more</Button>
            }
        </div>
    );
}

Index.getInitialProps = async (): Promise<PageIntialProps> => {
    const responses = await Promise.all([
        getPosts({ _sort: 'created_at:DESC' }),
        getPage('blog')
    ]);
    const postsResponse = responses[0];
    const pageResponse = responses[1];

    const initialPosts: Post[] = (!postsResponse.isError && postsResponse.data) || [];
    const page: Page = (!pageResponse.isError && pageResponse.data) || {};

    return { initialPosts, page };
}

export default Index;
