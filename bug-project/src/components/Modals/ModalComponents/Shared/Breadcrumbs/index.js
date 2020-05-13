import React, { useState } from 'react';
import {v4 as uuid} from 'uuid';

const Breadcrumbs = (props) => {

    const [breadcrumbs, setBreadcrumbs] = useState(["Projects", "Fullstack 2.1", "KanbanBoard"])


    const BreadcrumbRenderer = (props) => {
        const BreadcrumbJSX = breadcrumbs.map((breadcrumb, index) => {
            const breadcrumbSlash = (index < breadcrumbs.length -1) ? (breadcrumb + " / ") : breadcrumb;
            console.log(breadcrumbSlash);
            
                return (
                    <span>{breadcrumbSlash}</span>
                )
            })
        console.log(BreadcrumbJSX);
        
        return <div>{BreadcrumbJSX }</div>
    }

    return (
        <BreadcrumbRenderer breadcrumbs={breadcrumbs}/>
    )
}


export default Breadcrumbs