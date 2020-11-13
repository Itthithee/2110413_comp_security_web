import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

import {
	Grid,
	Card,
	Transition,
	Form,
	Button,
	Header,
} from "semantic-ui-react"

interface CommentListProp{
	comments: string[];
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
	const PostCard = styled(Card)`
		width: 60% !important;
	`;
	const CommentCard = styled(Card)`
		width: 100% !important;
	`;
	const Content = styled(Card.Content)`
		text-align: left;
	`;
	let elements = [];
	for(let i=0;i<props.comments.length;i++){
		elements.push(
			<CommentCard>
				<Content>
					<Label>{ props.comments[i] }.</Label>
				</Content>
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
	const CommentCard = styled(Card)`
		width: 100% !important;
	`;
	const Content = styled(Card.Content)`
		text-align: left;
	`;
	const newComment = useRef<HTMLInputElement>(null)

	let elements = [];
	for(let i=0;i<props.postList.length;i++){
		elements.push(
			<PostCard centered>
				<Card.Content>
					<Form>
						<Form.Field>
							<Label>{ props.postList[i].post }.</Label>
							<CommentList comments={props.postList[i].comments}/>
							<Grid.Row style={{display: 'flex'}}>
								<input placeholder="comment" ref={newComment}/>
								<Button style={{marginLeft: '10px'}}>Comment</Button>
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
	const [count, setCount] = useState(0);
	let testList = [{
		"post": "p1",
		"comments": ["c1", "c2"]
	}, 
	{
		"post": "p2",
		"comments": ["c3", "c4"]
	}];
	const [postList, setPostList] = useState(testList);
	const Label = styled.label`
		text-align: left;
	`;
	const MyGrid = styled(Grid)`
		padding-top: 10% !important;
	`;
	
	useEffect(() => {
		setPostList(testList);
	}, [count, postList]);

	return (
		<>
			<MyGrid>
				<Grid.Column>
					<Transition>
						<>
							<Header>Post</Header>
							<PostList postList={postList}/>
							<Button onClick={() => setCount(count + 1)}>Logout {count}</Button>
						</>			
					</Transition>
				</Grid.Column>
			</MyGrid>
		</>
	);
}

