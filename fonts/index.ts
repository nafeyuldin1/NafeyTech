import { Bangers


    , Afacad_Flux
} from 'next/font/google';

const Heading = Bangers
({
  subsets: ['latin'],
  weight: '400',
  variable: '--passionOne',
});

 
const body = Afacad_Flux({
  subsets: ['latin'],
  weight: '400',
  variable: '--passionOne',
});

export const HeadingFont  =  Heading.className;
 
export const BodyFont  =  body.className;