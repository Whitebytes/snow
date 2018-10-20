import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import Dashboard from '../components/Dashboard'


const PostLink = (props) => (
  <li>
    <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
)

export default () => (
  <Dashboard type="1" />
)
