import React from 'react'
import PageHeader from "../components/PageHeader"
import requireAuth from "../hoc/requireAuth"
import DeletedContainer from "../components/DeletedContainer/DeletedContainer"
const Deleted = () => {
    
    return (
        <PageHeader>
            <DeletedContainer/>
        </PageHeader>
    )
}
export default requireAuth(Deleted)
