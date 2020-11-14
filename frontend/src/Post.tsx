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

interface CommentListProp{
	comments: string[];
	hover: boolean;
}

interface PostItem{
	post: string;
	comments: string[];
}

interface postListProp{
	postList: PostItem[];
}


const CommentList: React.FC<CommentListProp> = (props) => {
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
	const newComment = useRef<HTMLInputElement>(null);
	
	const editComment = async () => {
		const result = await axios({
			method: "post",
			baseURL: process.env.REACT_APP_BACKEND_URL,
			// url: "editCommentURL"
			data: {

			}
		})
	}

	let elements = [];
	for(let i=0;i<props.comments.length;i++){
		elements.push(
			<CommentCard>
				<ContentLeft>
					<Label>{ props.comments[i] }</Label>	
				</ContentLeft>
				{(() => {
					if (i==1) { //check if is owner of comment OR is moderator
						return <ContentRight>
							<Form>
								<Form.Field>
									<Grid.Row style={{display: 'flex'}}>
										<input placeholder="edit" ref={newComment}/>
										<HoverText onClick={editComment}>Edit</HoverText>
										<HoverText>Delete</HoverText>
									</Grid.Row>
								</Form.Field>				
							</Form>
						</ContentRight>
					}
				})()}
			</CommentCard>
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
			<PostCard centered>
				<Card.Content>
					<Form>
						<Form.Field>
							<Label>{ props.postList[i].post }.</Label>
							<CommentList comments={props.postList[i].comments} hover={false}/>
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
		"post": "p1",
		"comments": ["c1", "c2"]
	}, 
	{
		"post": "p2",
		"comments": ["c3", "c4"]
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
			setPostList([{post: result.data.username, comments: [result.data.userId, result.data.password]}]);
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

