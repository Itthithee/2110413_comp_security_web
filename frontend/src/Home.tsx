import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import {
	Grid,
	Card,
	Transition,
	Form,
	Button,
	Header,
} from "semantic-ui-react"
import { useCookies } from "react-cookie";
axios.defaults.withCredentials = true

interface CommentProp{
	comment: string;
	owner: string;
}

interface CommentListProp{
	comments: CommentProp[];
}

interface PostProp{
	post: string;
	owner: string;
	comments: CommentProp[];
}

interface postListProp{
	postList: PostProp[];
}

const ContentLeft = styled(Card.Content)`
text-align: left;
`;
const ContentRight = styled(Card.Content)`
text-align: right;
`;
const Label = styled.label`
text-align: left;
`;
const HoverText = styled.label`
text-align: right;
font-size: 12px;
margin: 10px;
&:hover {
	color: lightBlue;
}
`;

const Comment: React.FC<CommentProp> = (props) => {
	const [isEditting, setIsEditting] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const CommentCard = styled(Card)`
		width: 100% !important;
	`;
	const edittedComment = useRef<HTMLInputElement>(null);

	useEffect(() => {
		setIsEditting(false);
		setIsDeleting(false);
	}, [])

	const editComment = (editting: any) => {
		setIsEditting(editting);
	}

	const confirmEditComment = async () => {
		const result = await axios({
			method: "post",
			baseURL: process.env.REACT_APP_BACKEND_URL,
			// url: "editCommentURL"
			data: {

			}
		})
	}

	const deleteComment = (deleting: any) => {
		setIsDeleting(deleting);
	}

	const confirmDeleteComment = async () => {
		const result = await axios({
			method: "delete",
			baseURL: process.env.REACT_APP_BACKEND_URL,
			// url: "deleteCommentURL"
			data: {
			
			}
		})
	}

	return <CommentCard>
		<ContentLeft>
			<Label style={{fontWeight: 'bold'}}>{ props.owner+':' }</Label>
		</ContentLeft>
		<ContentLeft>
			{(() => {
				if(isEditting){
					return <Form>
						<Form.Field>
							<Grid.Row style={{display: 'flex'}}>
								<input placeholder={ props.comment } ref={edittedComment}/>
								<Button style={{marginLeft: '10px'}} onClick={confirmEditComment}>Edit</Button>
							</Grid.Row>
						</Form.Field>
					</Form>
				} else {
					return <Label>{ props.comment }</Label>
				}
			})()}
		</ContentLeft>
		{(() => {
			if (true) { //check if is owner of comment OR is moderator
				return <ContentRight>
					<HoverText onClick={() => editComment(!isEditting)}>{isEditting?"Cancel": "Edit"}</HoverText>
					{(() => {
						if (isDeleting) {
							return <>
								<Label>Are you sore you want to delete this comment?</Label>
								<HoverText onClick={() => confirmDeleteComment()}>Yes</HoverText>
								<HoverText onClick={() => deleteComment(!isDeleting)}>No</HoverText>
							</>
						} else {
							return <HoverText onClick={() => deleteComment(!isDeleting)}>Delete</HoverText>
						}
					})()}
				</ContentRight>
			}
		})()}
	</CommentCard>
}

const CommentList: React.FC<CommentListProp> = (props) => {
	let elements = [];
	for(let i=0;i<props.comments.length;i++){
		elements.push(
			<Comment comment={props.comments[i].comment} owner={props.comments[i].owner}/>
		)
	}
	
	return (
		<>
			{elements}
		</>
	)
}

const Post: React.FC<PostProp> = (props) => {
	const [isEditting, setIsEditting] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [dummyState, setDummyState] = useState(false);
	const PostCard = styled(Card)`
		width: 60% !important;
	`;
	const edittedPost = useRef<HTMLInputElement>(null);
	const newComment = useRef<HTMLInputElement>(null);

	useEffect(() => {
		setIsEditting(false);
		setIsDeleting(false);
	}, [])

	const editPost = (editting: any) => {
		setIsEditting(editting);
	}

	const confirmEditPost = async () => {
		const result = await axios({
			method: "post",
			baseURL: process.env.REACT_APP_BACKEND_URL,
			// url: "editPostURL"
			data: {

			}
		})
	}

	const deletePost = (deleting: any) => {
		setIsDeleting(deleting);
	}

	const confirmDeletePost = async () => {
		const result = await axios({
			method: "delete",
			baseURL: process.env.REACT_APP_BACKEND_URL,
			// url: "deletePostURL"
			data: {
			
			}
		})
	}

	const writeComment = async () => {
		const result = await axios({
			method: "post",
			baseURL: process.env.REACT_APP_BACKEND_URL,
			// url: "writeCommentURL"
			data: {
				
			}
		})
		setDummyState(!dummyState);
	}

	return <Transition
	mountOnShow
	transitionOnMount
	animation="fade down"
	duration={600}
	> 
		<PostCard centered>
			<ContentLeft>
				<Label style={{fontWeight: 'bold'}}>{ props.owner+':' }</Label>
			</ContentLeft>
			<ContentLeft>
				{(() => {
					if(isEditting){
						return <Form>
							<Form.Field>
								<Grid.Row style={{display: 'flex'}}>
									<input placeholder={ props.post } ref={edittedPost}/>
									<Button style={{marginLeft: '10px'}} onClick={confirmEditPost}>Edit</Button>
								</Grid.Row>
							</Form.Field>
						</Form>
					} else {
						return <Label>{ props.post }</Label>
					}
				})()}
			</ContentLeft>
			<ContentRight>
				{(() => {
					if (true) { //check if is owner of post OR is moderator
						return <ContentRight>
								<HoverText onClick={() => editPost(!isEditting)}>{isEditting?"Cancel": "Edit"}</HoverText>
							{(() => {
								if (isDeleting) {
									return <>
										<Label>Are you sore you want to delete this post?</Label>
										<HoverText onClick={() => confirmDeletePost()}>Yes</HoverText>
										<HoverText onClick={() => deletePost(!isDeleting)}>No</HoverText>
									</>
								} else {
									return <HoverText onClick={() => deletePost(!isDeleting)}>Delete</HoverText>
								}
							})()}
						</ContentRight>
					}
				})()}
			</ContentRight>
			<ContentLeft>
				<Form>
					<Form.Field>
						<CommentList comments={props.comments}/>
						<Grid.Row style={{display: 'flex'}}>
							<input placeholder="comment" ref={newComment}/>
							<Button style={{marginLeft: '10px'}} onClick={writeComment}>Comment</Button>
						</Grid.Row>
					</Form.Field>				
				</Form>
			</ContentLeft>			
		</PostCard>
	</Transition>
} 

const PostList: React.FC<postListProp> = (props) => {
	let elements = [];
	for(let i=0;i<props.postList.length;i++){
		elements.push(
			<Post post={props.postList[i].post} owner={props.postList[i].owner} comments={props.postList[i].comments}/>
		)
	}

	return (
		<>
			{elements}
		</>
	)
};


export const Home: React.FC = () => {
	let testList = [{
		"post": "post1",
		"owner": "user1",
		"comments": [{
			"comment": "comment1",
			"owner": "user2"
		},{
			"comment": "comment2",
			"owner": "user3"
		}]
	}, 
	{
		"post": "post2",
		"owner": "user4",
		"comments": [{
			"comment": "comment3",
			"owner": "user5"
		},{
			"comment": "comment4",
			"owner": "user6"
		}]
	}];
	const [postList, setPostList] = useState(testList);
	const [testId, setTestId] = useState(1);
	const [dummyState, setDummyState] = useState(false);
	const [cookies, setCookie,removeCookie] = useCookies(['token']);
	const MyGrid = styled(Grid)`
		padding-top: 20px !important;
	`;
	const NewPostCard = styled(Card)`
		width: 60% !important;
	`;
	const newPost = useRef<HTMLInputElement>(null);
	
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios({
				method: "get",
				baseURL: process.env.REACT_APP_BACKEND_URL,
				url: "/users/"
			})
			let tempList = [];
			for(let i=0;i<result.data.length;i++){
				const temp={
					post: result.data[i].userId,
					owner: result.data[i].username,
					comments: [{
						comment: result.data[i].password,
						owner: result.data[i].username
				}]};
				tempList.push(temp);
			}
			setPostList(tempList);
		}

		fetchData();
	}, []);

	const logout = async() => {
		const result = await axios({
          method: "post",
          baseURL: process.env.REACT_APP_BACKEND_URL,
          url: "auth/logout",
        })
	}

	const writePost = async() => {
		const result = await axios({
			method: "post",
			baseURL: process.env.REACT_APP_BACKEND_URL,
			url: "/users/",
			data: {
				userId: 10,
				username: "Tony",
				password: newPost.current?.value
			}
		})
		setDummyState(!dummyState);
	}

	return (
		<>
			<MyGrid>
				<Grid.Column>
					<Header>Welcome!</Header>
						<Transition
							mountOnShow
							transitionOnMount
							animation="fade down"
							duration={600}
						>
							<NewPostCard centered>
								<Card.Content>
									<Form>
										<Form.Field>
											<Grid.Row style={{display: 'flex'}}>
												<input placeholder="new post" ref={newPost}/>
												<Button style={{marginLeft: '10px'}} onClick={writePost}>Post!</Button>
											</Grid.Row>
										</Form.Field>				
									</Form>
								</Card.Content>		
							</NewPostCard>	
						</Transition>
					<PostList postList={postList}/>
					<Button onClick={logout}>Logout</Button>	
				</Grid.Column>
			</MyGrid>
		</>
	);
}

