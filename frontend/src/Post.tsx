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
export const Post: React.FC = () => {
	const Label = styled.label`
		text-align: left;
	`;
	const MyGrid = styled(Grid)`
		padding-top: 10% !important;
	`;
	const Content = styled(Card.Content)`
		text-align: left;
	`;
	const comment = useRef<HTMLInputElement>(null)
	return (
		<>
			<MyGrid>
				<Grid.Column>
					<Transition>
						<>
							<Header>Post</Header>
							<Card centered>
								<Card.Content>
									<Form>
										<Form.Field>
											<Label>This is a post.</Label>
											<Card>
												<Content>
													<Label>This is a comment.</Label>
												</Content>
											</Card>
											<input placeholder="comment" ref={comment}/>
										</Form.Field>
									</Form>
								</Card.Content>
							</Card>
							<Card centered>
								<Card.Content>
									<Form>
										<Form.Field>
											<Label>This is a post.</Label>
											<Card>
												<Content>
													<Label>This is a comment.</Label>
												</Content>
											</Card>
											<input placeholder="comment" ref={comment}/>
										</Form.Field>
									</Form>
								</Card.Content>
							</Card>
							<Button>Logout</Button>
						</>			
					</Transition>
				</Grid.Column>
			</MyGrid>
		</>
	);
}