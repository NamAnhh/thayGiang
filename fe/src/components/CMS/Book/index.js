

import React from "react";
import { connect } from "react-redux";
import { fetchBooks } from "../../../actions/bookAction";
import { Table, Button,Icon } from 'antd';
import "antd/dist/antd.css";
import styles from './styles'
import {browserHistory} from 'react-router';

const columns = [
    {
        title: 'Tên sách',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Tiêu đề',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Tên loại sách',
        dataIndex: 'bookList[0].name',
        key: 'bookList',
    },
    {
        title: 'Giá bán',
        dataIndex: 'price',
        key: 'price',
        render: (text, data) => (
            <div>
                {data.price.concat(".000 đ")}
            </div>
            
        ),
    },
    {
        title: 'Số lượng',
        dataIndex: 'quantity',
        key: 'quantity',
        width: '10%'
    },
    {
        title: 'isShow trang chủ',
        dataIndex: 'showOnHome',
        key: 'showOnHome',
        width: '11%',
        render: (data) => (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {data.showOnHome == true ? <div style={styles.showHomeActive}>TRUE</div> : <div style={styles.showHomeDeactive}>FALSE</div>}
            </div>
            
        ),
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        width: '8%',
        render: (text, data) => (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {data.status == "active" ? <button style={styles.btnActive}>Active</button> : <button style={styles.btnDeactive}>Deactive</button>}
            </div>
            
        ),
    },
    {
        title: 'Tính năng',
        dataIndex: 'function',
        width: '8%',
        render: (text, data) => (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <a onClick={() => this._editClick(data.id)}><Icon type="edit" /></a>|
                <a><Icon style={{color:'#FA541C'}} type="delete" /> </a>
            </div>
        )
    }
];

class Book extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchBooks();
    }

    gotoAddBook = () => {
        this.props.history.push('/addBooks')
    }

    render() {
        console.log("getBookData", this.props.getBookData)
        const { getBookData } = this.props;

        return (
            <div>
                <div>
                    <h1 style={{textAlign:'center'}}>BOOK LIST</h1>
                </div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'flex-end',marginBottom:'5px'}}>
                    <Button onClick={this.gotoAddBook} type="primary">Thêm Mới</Button>
                </div>
                <div>
                    <Table bordered columns={columns} dataSource={getBookData} />
                </div>
            </div>
        )
    }
}



//thằng studentRoot phải đặt trùng tên với rootReducer
const mapStateToProps = ({ bookRoot }) => ({
    getBookData: bookRoot.items,
    loading: bookRoot.loading,
    error: bookRoot.error
});


const mapDispatchToProps = dispatch => ({
    fetchBooks: () => dispatch(fetchBooks()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Book);