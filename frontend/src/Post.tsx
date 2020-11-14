import React, { useRef } from "react";
import styled from "styled-components";

import {
	Grid,
	Card,
	Transition,
	Form,
	Button,
	Header,
	GridRow,
	GridColumn
} from "semantic-ui-react"
import {useCookies} from "react-cookie"
const PostList: React.FC = ({ postList }: any) => {
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

	let testList = [{
										"post": "p1",
										"comment": "c1"
									}, 
									{
										"post": "p2",
										"comment": "c2"
									},
									{
										"post": "p3",
										"comment": "c3"
									},
									{
										"post": "p4",
										"comment": "c4"
									}];
	let elements = [];
	for(let i=0;i<testList.length;i++){
		elements.push(
			<PostCard centered>
				<Card.Content>
					<Form>
						<Form.Field>
							<Label>{ testList[i].post }.</Label>
							<CommentCard>
								<Content>
									<Label>{ testList[i].comment }.</Label>
								</Content>
							</CommentCard>
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
	const Label = styled.label`
		text-align: left;
	`;
	const MyGrid = styled(Grid)`
		padding-top: 10% !important;
	`;
	const [cookies, setCookie,removeCookie] = useCookies(['token']);
	const logout = () =>{
	  removeCookie('token',{path:'/'})
	}
	return (
		<>
			<MyGrid>
				<Grid.Column>
					<Transition>
						<>
							<Header>Post</Header>
							<PostList/>
							<Button onClick={logout}>Logout</Button>
						</>			
					</Transition>
				</Grid.Column>
			</MyGrid>
		</>
	);
}