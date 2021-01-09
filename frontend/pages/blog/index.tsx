import React, { useState, useCallback, useMemo } from 'react';
import { NextPage } from 'next';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Post, PostQuery, Page, BannerSection, HeroSection } from '../../src/tools/Models';
import { getPosts, getPage } from '../../src/tools/Service';
import Link from 'next/link';
import Image from '../../src/components/styledComponents/StyledImage';
import Search from '../../src/components/styledComponents/StyledSearch';
import { Button, CircularProgress } from '@material-ui/core';
import clsx from 'clsx';
import { useInfiniteItems } from '../../src/hooks/useInfiniteItems';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Banner from '../../src/components/sections/Banner';
import Hero from '../../src/components/sections/Hero';

type PageIntialProps = {
    initialPosts: Post[];
    page: Page;
};

const defaultPageSize = 10;

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            background: theme.palette.backgrounds.main
        },
        search: {
            marginTop: 16
        },
        container: {
            minHeight: '40vh',
            width: '100%',
            maxWidth: 1080,
            padding: 24,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between'
        },
        reloadingContainer: {
            alignItems: 'center',
            justifyContent: 'center'
        },
        postTile: {
            width: 'calc(50% - 4px)',
            marginBottom: 8,
            overflow: 'hidden'
        },
        subTitle: {
            fontWeight: 300,
            fontSize: 14,
            lineHeight: 'normal'
        },
        postImage: {
            width: '100%',
            height: 320,
            transition: 'transform 0.225s linear',
            '&:hover': {
                transform: 'scale(1.03)'
            }
        },
        gridList: {
            width: '100%'
        },
        loading: {
            margin: 64
        },
        loadButton: {
            margin: 32
        },
        '@media (max-width: 800px)': {
            container: {
                flexDirection: 'column'
            },
            postTile: {
                width: '100%'
            }
        }
    }),
);

const Index: NextPage<PageIntialProps> = ({ page, initialPosts }) => {
    const classes = useStyles();
    const [searchTerm, setSearchTerm] = useState('');

    const heroSection = useMemo(() => page.content?.find(section => section.__component === 'section.hero') as HeroSection | undefined, [page]);
    const bannerSection = useMemo(() => page.content?.find(section => section.__component === 'section.banner') as BannerSection | undefined, [page]);

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
            {heroSection &&
                <Hero hero={heroSection}>
                    <Search
                        onAccept={reloadItems}
                        className={classes.search}
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </Hero>}
            {!heroSection && bannerSection &&
                <Banner banner={bannerSection}>
                    <Search
                        onAccept={reloadItems}
                        className={classes.search}
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </Banner>}
            <div className={clsx(classes.container, isReloading && classes.reloadingContainer)}>
                {isReloading ?
                    <CircularProgress className={classes.loading} color='secondary' /> :
                    <>
                        {items.map((post) => (

                            <GridListTile key={post.id} className={classes.postTile} component='div'>
                                <Link key={post.id} href={`/blog/${post.identifier}`}>
                                    <a>
                                        <Image className={classes.postImage} previewUrl={post.image?.previewUrl} src={post.image?.formats?.small?.url || post.image?.url} />

                                        <GridListTileBar
                                            title={post.title}
                                            subtitle={<span>{post.subtitle}</span>}
                                            classes={{ subtitle: classes.subTitle }}
                                        />
                                    </a>
                                </Link>
                            </GridListTile>
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
