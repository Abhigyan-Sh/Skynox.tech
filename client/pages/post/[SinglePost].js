import axios from 'axios'

const serverUrl = 'http://localhost:3000/api/post/'

export default function SinglePost(props) {
  const styles = {
    container: 'p-2 h-screen',
    main: 'flex justify-center items-center border border-zinc-800 h-full',
    txt: 'text-3xl'
  }
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h2 className={styles.txt}>{props.singlePostMsg.postMessage}</h2>
      </div>
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  var id = ctx.query.SinglePost
  console.log(`id is ${id}`)
  const { data } = await axios.get(serverUrl + id)
  console.log(data)
  return {
    props: {
      singlePostMsg: data.post
    }
  }
}