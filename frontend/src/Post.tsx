import React, { useRef } from "react";
import styled from "styled-components";

import {
	Grid,
	Card,
	Transition,
	Form,
	Button,
	Header
} from "semantic-ui-react"

const PostList: React.FC = ({ postList }: any) => {
	const Label = styled.label`
		text-align: left;
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
			<Card centered>
				<Card.Content>
					<Form>
						<Form.Field>
							<Label>{ testList[i].post }.</Label>
							<Card>
								<Content>
									<Label>{ testList[i].comment }.</Label>
								</Content>
							</Card>
							<input placeholder="comment" ref={newComment}/>
						</Form.Field>
					</Form>
				</Card.Content>
			</Card>
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

	return (
		<>
			<MyGrid>
				<Grid.Column>
					<Transition>
						<>
							<Header>Post</Header>
							<PostList/>
							<Button>Logout</Button>
						</>			
					</Transition>
				</Grid.Column>
			</MyGrid>
		</>
	);
}