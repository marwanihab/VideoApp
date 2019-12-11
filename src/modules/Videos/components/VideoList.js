import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { List, Spin, Typography, Row, Col, Icon, Button, Alert} from 'antd';
import InfiniteScroll from 'react-infinite-scroller';



import { GET_MOVIES, ADD_ACTION } from '../store/gql'


const VideosList = (props) => {

  const {Title} = Typography
  const [loadingState, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [logedIn, setLogedIn] = useState(false)
  const [addAction] = useMutation(ADD_ACTION)




  const onActionUP = async( movieID) => {  
        try { 
          const variables ={
            name: localStorage.getItem('username'),
            movieID: movieID,
            action: 'UP'
          }
          const response = await addAction({ variables: variables} )
          console.log(response)

          
          document.getElementById(movieID+"like").style.color = "black"
          document.getElementById(movieID+"dislike").style.color = "#C4BEBE"

        } catch (e) {
          console.log(e)
        }
  }

  const onActionDOWN = async( movieID) => {  
    console.log(movieID)
        try { 
          const variables ={
            name: localStorage.getItem('username'),
            movieID: movieID,
            action: 'Down'
          }
          const response = await addAction({ variables: variables} )
          console.log(response)
          document.getElementById(movieID+"like").style.color = "#C4BEBE"
          document.getElementById(movieID+"dislike").style.color = "black"

        } catch (e) {
          console.log(e)
        }
  }


  const variables = {}
  const { loading, data } = useQuery(GET_MOVIES, {variables, fetchPolicy: 'cache-and-network'})
  


 useEffect(() => {
  
  const token = localStorage.getItem('token')
  token ? setLogedIn(true) : setLogedIn(false)
 
},[localStorage,logedIn]) // eslint-disable-line

 
 let rendervideos = []
 if (data){
  rendervideos = data[Object.keys(data)[0]].items.map((video) => {

      return(
          {
              movieID :video.movieID,
              description: video.description,
              title: video.name,
              sharedBy: video.sharedBy,
              likesArray: video.likedBy,
              dislikesArray: video.dislikedBy
          }
      )
    })
  }
  const handleInfiniteOnLoad = () => {
    setLoading(true)
    if (data.length > 14) {
   
      setLoading(true)
      setHasMore(true)
      return;
    }
 
  }
  //console.log(rendervideos)
  return (
   
    <div >
    <Spin spinning={loading}>
     <div className="demo-infinite-container" style={{
       border:"1px solid #e8e8e8",
       borderRadius: "4px",
       overflow: "auto",
       padding: "8px 24px",
       //textAlign: "center"
     }}>
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={handleInfiniteOnLoad}
          hasMore={!loadingState && hasMore}
          useWindow={false}
        >
          <List 
            dataSource={rendervideos}
            grid={{column:1}}
            renderItem={item => (
              <List.Item key={item.movieID} >
               <Row type="flex" >
               <Col span={12} 
                  style={{
                      position: "relative",
                      paddingRight:"10px",
                      // height: 0,
                      maxWidth: "500px",
                  }}
               >
                {/* <YouTube 
                    videoId={item.movieID}
                    opts={{}}
                    onReady={ function onPlayerReady(event) {
                    setReady(true)    
                      
                    }}
                  /> */}
                <div
                    className="video"
                    style={{
                      position: "relative",
                      paddingBottom: "280px" /* 16:9 */,
                      paddingLeft: "20px",
                      //marginTop: "15px",
                      height: 0,
                     
                      }}
                    > 
                    <iframe 
                    style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          frameBorder:"0"
                        }}
                      src= {`https://www.youtube.com/embed/${item.movieID}`}
                      frameBorder='0'
                      allow='autoplay; encrypted-media'
                      allowFullScreen
                      title='video'
                      allow='autoplay; encrypted-media' 
                      allowFullScreen 
                      title='video'
                      
                  /> 
                 </div>  
                </Col>    
                <Col span={12} 
                style={{
                 
                  Width: "100%",
              }}
                >  
                  <div>
                    <Title level={4}> 
                      {item.title}
                     
                    </Title>
                          { logedIn ? 

                            ((item.likesArray.includes(localStorage.getItem('username'))) && (!item.dislikesArray.includes(localStorage.getItem('username'))) ) ?

                            <p>Shared by : {item.sharedBy}                
                              <Button shape="circle" type="default" style={{margin:"5px"}} 
                                onClick={(e) => {
                                e.preventDefault()
                                e.target.type = "primary"
                                onActionUP(item.movieID) }
                                
                                }>
                                    <Icon id={item.movieID+"like"} type="like" theme="filled"  style={{color:"black"}}/> 
                                    
                              </Button>
                              <Button shape="circle" type="default"
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.target.type = "primary"
                                  onActionDOWN(item.movieID) }
                                  
                                  }
                              > 
                                <Icon id={item.movieID+"dislike"} type="dislike" theme="filled" style={{color:"#C4BEBE"}} />
                              </Button>
                              </p> 
                            
                             :

                             (!(item.likesArray.includes(localStorage.getItem('username'))) && (item.dislikesArray.includes(localStorage.getItem('username'))) ) ?
                             <p>Shared by : {item.sharedBy}                
                             <Button shape="circle" type="default" style={{margin:"5px"}} 
                               onClick={(e) => {
                               e.preventDefault()
                               e.target.type = "primary"
                               onActionUP(item.movieID) }
                               
                               }>
                                   <Icon id={item.movieID+"like"} type="like" theme="filled"  style={{color:"#C4BEBE"}}/> 
                                   
                             </Button>
                             <Button shape="circle" type="default"
                               onClick={(e) => {
                                 e.preventDefault()
                                 e.target.type = "primary"
                                 onActionDOWN(item.movieID) }
                                 
                                 }
                             > 
                               <Icon id={item.movieID+"dislike"} type="dislike" theme="filled" style={{color:"black"}} />
                             </Button>
                             </p> 
                             :
                                  
                      
                             <p>Shared by : {item.sharedBy}                
                             <Button shape="circle" type="default" style={{margin:"5px"}} 
                               onClick={(e) => {
                               e.preventDefault()
                               e.target.type = "primary"
                               onActionUP(item.movieID) }
                               
                               }>
                                   <Icon id={item.movieID+"like"} type="like" theme="filled"  style={{color:"#C4BEBE"}}/> 
                                   
                             </Button>
                             <Button shape="circle" type="default"
                               onClick={(e) => {
                                    e.preventDefault()
                                    e.target.type = "primary"
                                    onActionDOWN(item.movieID) }
                                 }
                             > 
                               <Icon id={item.movieID+"dislike"} type="dislike" theme="filled" style={{color:"#C4BEBE"}} />
                             </Button>
                             </p> 
                              : 

                              <p> </p>
                              
                              }
                    <p  style={
                      {
                        fontWeight: "bold"
                      }
                    }>Description: 
                    
                    <br />
                      
                      </p>
                     <p
                     style={
                      {
                        maxHeight: "130px",
                        overflowY : "scroll"

                      }
                    }
                     >{item.description}</p> 
                     
                  </div>  
                </Col>     
                </Row>   
              </List.Item>
            )}
          >
            {loadingState && hasMore && (
              <div className="demo-loading-container" style={{
                 position: "absolute",
                 bottom: "40px",
                 width: "100%",
                //  textAlign: "center"
              }}>
                <Spin />
              </div>
            )}
          </List>
        </InfiniteScroll>
      </div>
    </Spin>  
    </div>
  )
}


export default VideosList
//player
      //   <YouTube
      //    videoId={video.movieID}
      //    opts={{}}
      //    //onReady={'onPlayerReady'}
      //  />
    //<YouTubee video={video} autoplay="0" rel="0" modest="1" />
      // <div key= {video}>
      //   <ReactPlayer url= {`https://www.youtube.com/embed/${video.movieID}`} playing />
      // </div>
      // <div key= {video}
      // className="video"
      // style={{
      // position: "relative",
      // paddingBottom: "56.25%" /* 16:9 */,
      // paddingTop: 25,
      // height: 0
      // }}
      // >
//       <iframe src= {`https://www.youtube.com/embed/${video.movieID}`}
//       frameBorder='0'
//       allow='autoplay; encrypted-media'
//       allowFullScreen
//       title='video'
//       allow='autoplay; encrypted-media' allowFullScreen title='video'
// />

      //  <iframe
      //   style={{
      //     position: "absolute",
      //     top: 0,
      //     left: 0,
      //     width: "100%",
      //     height: "100%"
      //   }}
      //   src={`https://www.youtube.com/embed/${video}`}
      //   frameBorder="0"
      //  />
      // </div>