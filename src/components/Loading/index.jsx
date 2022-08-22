import { Center, CircularProgress } from "@chakra-ui/react";

const Loading = ({ text }) => {
    return (
        <>
            <Center>
                <CircularProgress isIndeterminate color="pink.500" />
            </Center>
            <Center>{text && text}</Center>
        </>
    );
};

export default Loading;
