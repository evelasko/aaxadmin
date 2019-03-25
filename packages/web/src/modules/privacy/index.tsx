import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { policyContent } from './content';

const Privacy:React.FC = () => {
    return ( <div style={{padding:25}}><ReactMarkdown source={policyContent} /></div> )
}
export default Privacy