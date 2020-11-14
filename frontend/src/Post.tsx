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

const Comment: React.FC<CommentProp> = (props) => {
	const [isEditting, setIsEditting] = useState(false);
	const Label = styled.label`
		text-align: left;
	`;
	const CommentCard = styled(Card)`
		width: 100% !important;
	`;
	const ContentLeft = styled(Card.Content)`
		text-align: left;
	`;
	const ContentRight = styled(Card.Content)`
		text-align: right;
	`;
	const HoverText = styled.label`
		text-align: right;
		font-size: 12px;
		margin: 10px;
		&:hover {
			color: lightBlue;
		}
	`;
	const edittedComment = useRef<HTMLInputElement>(null);

	useEffect(() => {
		setIsEditting(false);
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

	return <CommentCard>
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
							<HoverText>Delete</HoverText>
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


const PostList: React.FC<postListProp> = (props) => {
	const Label = styled.label`
		text-align: left;
	`;
	const PostCard = styled(Card)`
		width: 60% !important;
	`;
	const newComment = useRef<HTMLInputElement>(null);

	const writeComment = async () => {
		const result = await axios({
			method: "post",
			baseURL: process.env.REACT_APP_BACKEND_URL,
			// url: "writeCommentURL"
			data: {

			}
		})
	}

	let elements = [];
	for(let i=0;i<props.postList.length;i++){
		elements.push(
			<PostCard centered key={"post-"+i}>
				<Card.Content>
					<Form>
						<Form.Field>
							<Label>{ props.postList[i].post }.</Label>
							<CommentList comments={props.postList[i].comments}/>
							<Grid.Row style={{display: 'flex'}}>
								<input placeholder="comment" ref={newComment}/>
								<Button style={{marginLeft: '10px'}} onClick={writeComment}>Comment</Button>
							</Grid.Row>
						</Form.Field>				
					</Form>
				</Card.Content>
			</PostCard>
		)
	}

	return (
		<>
			{elements}
		</>
	)
};


export const Post: React.FC = () => {
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
	const [cookies, setCookie,removeCookie] = useCookies(['token']);

	const Label = styled.label`
		text-align: left;
	`;
	const MyGrid = styled(Grid)`
		padding-top: 10% !important;
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
				url: "/users/id/" + testId
			})
			setPostList([{
				post: result.data.userId,
				owner: result.data.username,
				comments: [result.data.password]
			}])
		}

		fetchData();
	}, []);

	const logout = () => {
		removeCookie('token',{path:'/'});
	}

	const writePost = async() => {
		const result = await axios({
			method: "post",
			baseURL: process.env.REACT_APP_BACKEND_URL,
			//url: writePostURL
			data: {

			}
		})
	}

	return (
		<>
			<MyGrid>
				<Grid.Column>
					<Transition>
						<>
							<Header>Welcome!</Header>
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
							<PostList postList={postList}/>
							<Button onClick={logout}>Logout</Button>
						</>			
					</Transition>
				</Grid.Column>
			</MyGrid>
		</>
	);
}

