import React, { useState, useEffect } from 'react'

const URL = 'https://jsonplaceholder.typicode.com/'
export default function App() {
  const [users, setUsers] = useState([])
  const [photos, setPhotos] = useState([])
  const [albums, setAlbums] = useState([])

  const [data, setData] = useState([])

  const getPhotos = async () => {
    fetch(URL + 'photos')
      .then((res) => res.json())
      .then((results) => setPhotos(results))
  }

  const getUsers = async () => {
    fetch(URL + 'users')
      .then((res) => res.json())
      .then((results) => setUsers(results))
  }

  const getAlbums = async () => {
    fetch(URL + 'albums')
      .then((res) => res.json())
      .then((results) => setAlbums(results))
  }

  const mapPhotoToUser = (photos, albums, users) => {
    let mappedAlbums = []
    users.forEach((user) => {
      let albumsForUsers = albums.filter((album) => album.userId === user.id)
      mappedAlbums.push(albumsForUsers)
      //console.log(albumsForUsers);
    })

    let temp = []
    mappedAlbums.forEach((item) => {
      item.map((userData) => {
        let data = {
          username: users.find((user) => user.id === userData.userId).username,
          userid: userData.userId,
          photos: photos.filter((photo) => photo.albumId === userData.id),
        }
        temp.push(data)
      })
      console.log(temp)
      setData(temp)
    })
  }

  useEffect(() => {
    getPhotos()
    getUsers()
    getAlbums()
  }, [])

  return (
    <div className='App'>
      <button
        onClick={() => mapPhotoToUser(photos, albums, users)}
        style={{ width: '100%', height: 50, backgroundColor: 'gold' }}
      >
        Click to Load Album
      </button>
      {/* photo, album id, userId, username  */}

      {/* <button onClick={() => mapPhotoToUser(photos, albums, users)}>
        Test Filter
      </button> */}

      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Photos</th>
          </tr>

          {data.map((record, index) => (
            <tr key={index}>
              <td>{record.userid}</td>
              <td>{record.username}</td>
              {record.photos.map((x) => (
                <td>
                  <img src={x.thumbnailUrl} alt='somephoto' />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
