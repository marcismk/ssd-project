import { httpClient } from "@/lib/client";
import { Button, Modal, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";


export const CreatePost = () => {
    const [loading, setLoading] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);
    const form = useForm({
        initialValues: {
            title: "",
            image: "",
        },
        validate: {
            title: (value) => (value.length < 2 ? "Title must be at least 2 characters" : null),
            image: (value) => (value.length < 5 ? "Image URL must be at least 5 characters" : null),
        },
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            await httpClient.post("/posts", values);
            close();
        } catch (error) {
            console.error("Failed to create post", error);
        }
    }


    return (
        <>
            <Modal opened={opened} onClose={close} title="Create post">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack gap="md" p="md">

                        <TextInput
                            withAsterisk
                            label="Title"
                            placeholder="Post title"
                            key={form.key('title')}
                            {...form.getInputProps('title')}
                        />
                        <TextInput
                            withAsterisk
                            label="Image URL"
                            placeholder="Image URL"
                            key={form.key('image')}
                            {...form.getInputProps('image')}
                        />
                        <Button type="submit">Save post</Button>
                    </Stack>
                </form>
            </Modal>

            <Button variant="default" onClick={open} style={{ position: "absolute", top: 20, right: 20 }}>
                Open modal
            </Button>
        </>
    )
}