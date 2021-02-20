import React from 'react'
import PageHeader from "../components/PageHeader"
import requireAuth from "../hoc/requireAuth"

const Deleted = () => {
    return (
        <PageHeader>
            
        </PageHeader>
    )
}

export default requireAuth((Deleted))
