import * as React from "react";
import { CardsSection, HeroSection, BannerSection, TextSection, TestimonialsSection, ColumnsSection, PageContent, ContactSection, GallerySection } from '../tools/Models';
import Hero from './sections/Hero';
import Cards from './sections/Cards';
import Banner from './sections/Banner';
import Text from './sections/Text';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import Gallery from './sections/Gallery';

interface GenericContentProps {
    content?: PageContent[];
    style?: React.CSSProperties;
    className?: string;
}

const GenericContent: React.FC<GenericContentProps> = (props) => {
    const { className, style, content } = props;
    return (
        <div className={className} style={style}>
            {content?.map((item: any) => {
                switch (item.__component) {
                    case 'section.hero':
                        return <Hero key={`hero-${item.id}`} hero={(item as HeroSection)} />
                    case 'section.cards':
                        return <Cards key={`cards-${item.id}`} cards={(item as CardsSection)} />
                    case 'section.banner':
                        return <Banner key={`banner-${item.id}`} banner={(item as BannerSection)} />
                    case 'section.text':
                        return <Text key={`text-${item.id}`} text={(item as TextSection)} />
                    case 'section.testimonials':
                        return <Testimonials key={`testimonials-${item.id}`} testimonials={(item as TestimonialsSection)} />
                    case 'section.contact':
                        return <Contact key={`contact-${item.id}`} contact={(item as ContactSection)} />
                    case 'section.gallery':
                        return <Gallery key={`gallery-${item.id}`} gallery={(item as GallerySection)} />
                }
                return null;
            })}
        </div>
    );
};

export default GenericContent;