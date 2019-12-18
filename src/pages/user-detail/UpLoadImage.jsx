import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Upload,Icon,message} from 'antd'

export default class UpLoadImage extends Component{

    static propTypes = {
        sendProduct : PropTypes.object.isRequired
    }

    state = {
        loading: false,
        imageUrl:'', //存放图片地址
    };



    //为了向父组件发送当前上传的头像地址
    sendImageUrl(url){
        this.props.UpLoadImage(url)
    }

    componentWillMount(){
        this.sendImageUrl(this.props.sendProduct.cover)
    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }


        if (info.file.status === 'done') {
            const result = info.file.response
            if(result.url){
                message.success('上传图片成功')
                const {name,url} = result
                info.file.name = name
                info.file.url = url
                this.setState({
                    loading : false,
                    imageUrl: url
                },()=>{
                    this.sendImageUrl(url)
                });
            }
            else{
                message.error('上传图片失败')
            }
        }
    };

    render () {

        const uploadButton = this.props.sendProduct.cover ? (
            <img src={this.props.sendProduct.cover} alt='img'/>

        ) : ( <div>
            <Icon type={this.state.loading ? 'loading' : 'plus'} />
            <div className="ant-upload-text">Upload</div>
        </div>)

        return (
            <Upload
                action= 'http://39.106.188.22:8800/api/goods/image'
                listType="picture-card"
                name="file"
                accept='image/*'
                className="avatar-uploader"
                showUploadList={false}
                onChange={this.handleChange}
            >
                {
                    this.state.imageUrl
                        ? <img src={this.state.imageUrl} alt="avatar" style={{ width: '100%' }} />
                        : uploadButton
                }
            </Upload>
        )
    }
}

