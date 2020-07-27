import React, { Component, PureComponent } from 'react';
import { Text, View, FlatList } from 'react-native';
import { Images, Colors } from '../../theme'
import BPText from '../../common/BPText/BPText'
import _ from 'lodash'
class Card extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between', marginVertical: 3, paddingVertical: 2, marginHorizontal: 16, }}>
                <BPText style={{ fontSize: 12, color: this.props.type == 1 ? Colors.red : Colors.lightGreen }}>{this.props.item.a.toFixed(2)}</BPText>
                <BPText style={{ fontSize: 12, color: this.props.type == 1 ? Colors.red : Colors.lightGreen }}>{this.props.item.p.toFixed(2)}</BPText>

            </View>
        );
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }
    UNSAFE_componentWillReceiveProps(props) {
        //console.log("componentWillReceiveProps", props)
        if (props.data) {
            if (props.type == 1) {
                this.setState({ data: _.sortBy(props.data, 'price').slice(props.data.length - props.lineNumbers).reverse() })
            } else {
                this.setState({ data: _.sortBy(props.data, 'price').slice(props.data.length - props.lineNumbers).reverse() })
            }

        }
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {this.state.data.length > 0 ? <FlatList
                    data={this.state.data}
                    renderItem={({ item }) =>
                        <Card item={item} type={1} />
                    }
                    //Setting the number of column
                    getItemLayout={(data, index) => {
                        return {
                            index,
                            length: 30, // itemHeight is a placeholder for your amount
                            offset: index * 30,
                        }
                    }}
                    keyExtractor={(item, index) => item.t.toString()}
                /> : null}

            </View>
        )
    }
}




export default App;