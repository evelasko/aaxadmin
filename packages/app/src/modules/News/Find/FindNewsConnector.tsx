import * as React from 'react'
import { Card } from 'react-native-elements'
import { Text, View, ScrollView, ImageURISource } from 'react-native'
import { withAllNews, WithFindNews } from '@aaxadmin/controller'
// const { Meta } = Card

class N extends React.PureComponent<WithFindNews>{
    getImageUri(url: string) {
        const ur = {} as ImageURISource
        ur.uri = url
        return ur
    }
    render() {
        const { news, loading } = this.props
        return (
        <View style={{marginTop:100}}>
            {loading && <Text>...loading</Text>}
            <ScrollView>
                <Text>News({news.length})</Text>
                {news.map(n => (
                <Card   key={`${n.id}-card`} 
                        flexDirection='column'
                        // style={{ width: 400 }} 
                        image={this.getImageUri(n.imageURL as string)}
                        title={n.title}
                >
                    <Text>{n.category}</Text>
                </Card>
                ))}
            </ScrollView>
        </View>
        )
}}

export const FindNewsConnector = withAllNews(N)