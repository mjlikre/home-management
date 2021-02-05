import React from 'react'
import requireAuth from "../hoc/requireAuth"
import PageHeader from "../components/PageHeader"
import SalesPopup from "../components/Sales/SalesPopup"
import SalesContainer from "../components/Sales/SalesContainer"
const Sales = () => {
    return (
        <PageHeader>
            <SalesPopup/>
            <SalesContainer/>
        </PageHeader>
    )
}
export default requireAuth((Sales));