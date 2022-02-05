import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { Card,Button,Message } from 'semantic-ui-react'
function Page404() {
    return (
        <Card centered>
        <Message info>الصفحة غير موجودة</Message>
        <Button as={Link} to="/">
          العودة
        </Button>
      </Card>
    )
}

export default Page404
