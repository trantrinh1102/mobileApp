import React, { Component } from 'react'
import { View, Text, Image, ListView } from 'react-native'
import { connect } from 'react-redux'
import styles from './Styles/HomeScreenStyle'
import CocktailRow from '../Components/CocktailRow'
import CocktailsActions from '../Redux/CocktailsRedux'


class HomeScreen extends Component {
   

    componentDidMount(){
        console.log("componentDidMount", this.props)
        
        this.props.getAllCocktails();
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps", nextProps)
        
        if (this.props.cocktails.cocktails !== nextProps.cocktails.cocktails) {
            console.log("componentWillReceiveProps 2", nextProps)
            
            const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
            this.setState({
                dataSource: ds.cloneWithRows(nextProps.cocktails.cocktails)
            })
        }
    }

    renderRow(details) {
        // console.log('details', details)
        return (
            <CocktailRow {...details} />
        )
    }


    render() {
        console.log('render', this.props);
        const IS_LOADING = this.props.cocktails.fetching === true
        console.log('IS_LOADING', IS_LOADING);
        const HAS_ERROR = this.props.cocktails.error === true
        console.log('HAS_ERROR', HAS_ERROR);

        return (
            <View style={styles.container}>
                {HAS_ERROR && <Text style={styles.welcome}>Error fetching data</Text>}
                {IS_LOADING && <Text style={styles.welcome}>Making Cocktails...</Text>}
                {!IS_LOADING && !HAS_ERROR &&
                    <ListView style={styles.container}
                        dataSource={this.state.dataSource}
                        renderRow={(rowData) => this.renderRow(rowData)}
                    />
                }
            </View>
        )
    }

   
}

const mapStateToProps = (state) => {
    return {
        cocktails: state.cocktails
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCocktails: () => dispatch(CocktailsActions.getCocktailsRequest()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)