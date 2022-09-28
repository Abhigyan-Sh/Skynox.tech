import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import { useState } from 'react'
import '../styles/Home.module.css'

const serverUrl = 'http://localhost:3000/api/post/'

export default function Home(props) {
  const styles = {
    container: 'p-2 h-screen',
    main: 'flex flex-col border border-zinc-800 h-full',
    mainTop: ' basis-1/12 border-b border-zinc-800',
    mainBottom: 'basis-11/12',
    postThoughtsCover: 'w-7/12 m-auto lg:w-9/12 md:w-10/12',
    postThoughtsUpr: 'flex flex-col pt-20 items-end',
    postThoughtsBtm: 'mt-12 h-96 overflow-y-scroll overflow-x-hidden',
    txtArea: 'p-2 text-xl w-full border border-zinc-800 text-zinc-700 resize-none md:text-lg',
    btn: 'bg-white border border-zinc-800 px-5 text-xl w-fit mt-4 md:text-lg',
  }
  const [ gotMessages, setGotMessages ] = useState(props.eachMessage)
  const [ message, setMessage ] = useState('')
  
  const handleSubmit = async () => {
    const response = await axios.post(serverUrl, {
      postMessage: message
    })
    const newMsg = response.data.data
    setGotMessages((prev) => {
      return (
        [...prev, newMsg]
      )
    })
    console.log(newMsg)
    setMessage('')
  }
  /* console.log(gotMessages) */

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Posts</title>
        <meta name="description" content="Generated posts, blog, social media, message" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.mainTop}></div>
        <div className={styles.mainBottom}>

          <div className={styles.postThoughtsCover}>
            {/* 1 */}
            <div className={styles.postThoughtsUpr}>
              <textarea className={styles.txtArea}
                placeholder='Post your thoughts'
                rows='4'
                maxLength='120'
                value= {message}
                onChange= {(e) => {setMessage(e.target.value)}}
              />
              <button 
                className={styles.btn}
                onClick= {handleSubmit}
                >
                  Send
                </button>
            </div>
            {/* 2 */}
            <div className={styles.postThoughtsBtm}>
              {gotMessages.map((e, i) => {
                /* console.log(e) */
                return (
                <Message key= {i} prop= {e}/>
              )
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

const Message = ({prop}) => {
  const styles = {
    msgCover: 'relative my-5 border border-zinc-800 p-2 px-3 text-2xl text-zinc-700 h-24 md:text-lg sm:h-28 xs:h-36 cursor-pointer',
    msgTxt: 'text-zinc-600 break-normal',
    date_n_timeCover: 'absolute bottom-0 right-0 bg-white p-1 text-sm rounded-l-lg text-rose-500',
    dateTxt: 'text-xs font-bold'
  }
  const date = new Date(prop.createdAt)
  return (
    <Link href={`/post/${prop._id}`}>
      <div className={styles.msgCover}>
        <p className={styles.msgTxt}>{prop.postMessage}</p>
        <div className={styles.date_n_timeCover}>
          <p className={styles.dateTxt}>{date.toDateString()}</p>
          <p>{`${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`}</p>
        </div>
      </div>
    </Link>
  )
}

export const getServerSideProps = async () => {
  const { data } = await axios.get(serverUrl)
  console.log(data)
  return {
    props: {
      eachMessage: data.post
    }
  }
}