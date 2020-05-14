import React, { useState } from 'react';

const Breadcrumbs = (props) => {

    const [breadcrumbs] = useState(["Projects", "Fullstack 2.1", "KanbanBoard"])


    const BreadcrumbRenderer = (props) => {
        const BreadcrumbJSX = breadcrumbs.map((breadcrumb, index) => {
            const breadcrumbSlash = (index < breadcrumbs.length -1) ? (breadcrumb + " / ") : breadcrumb;
            
                return (
                    <span>{breadcrumbSlash}</span>
                )
            })
        
        return <div>{BreadcrumbJSX }</div>
    }

    return (
        <BreadcrumbRenderer breadcrumbs={breadcrumbs}/>
    )
}


export default Breadcrumbs