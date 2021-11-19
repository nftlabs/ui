import {
  Alert,
  AlertIcon,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useSwitchNetwork, useWeb3 } from "../..";
import { useThirdwebContext } from "../providers/Web3Provider";
import { AddressCopyButton } from "./AddressCopyButton";

export const ModalConnected: React.FC = () => {
  const { supportedChainIds } = useThirdwebContext();
  const { switchNetwork, switchError } = useSwitchNetwork();
  const {
    chainId,
    connector,
    error,
    address,
    activeProvider,
    disconnectWallet,
    getNetworkMetadata,
  } = useWeb3();

  return (
    <Flex direction="column">
      {!connector?.magic && !connector?.walletConnectProvider && (
        <>
          <Flex direction="column">
            <Heading as="h4" size="sm" fontWeight="600" mb="12px">
              Switch network
            </Heading>
            {supportedChainIds.map((cId) => (
              <Flex
                alignSelf="center"
                onClick={() => switchNetwork(cId)}
                align="center"
                width="md"
                px="20px"
                py="2px"
                cursor="pointer"
              >
                <Flex 
                  width="100%"
                  align="center"
                  borderRadius="25px"
                  padding="8px"
                  justify="space-between"
                  bg={cId === chainId ? "gray.100" : undefined}
                  _hover={{
                    bg: "gray.200",
                  }}
                >
                  <Flex align="center">
                    <Image
                      src={getNetworkMetadata(cId).iconUrl}
                      height="36x"
                      width="36px"
                      borderRadius="25px"
                    />
                    <Text ml="12px" fontWeight="medium" fontSize="14px">
                      {getNetworkMetadata(cId).chainName}
                    </Text>
                  </Flex>
                  {cId === chainId && (
                    <Text color="blue.400" fontSize="14px" mr="8px">
                      Connected
                    </Text>
                  )}
                </Flex>
              </Flex>
            ))}
          </Flex>

          <Divider mt="32px" mb="24px" width="md" alignSelf="center" />
        </>
      )}

      <Stack spacing={4}>
        <Heading as="h4" size="sm" fontWeight="600">
          Connected wallet
        </Heading>

        {error || switchError ? (
          <Alert
            status="error"
            borderRadius="md"
            fontSize="sm"
            fontWeight="medium"
          >
            <AlertIcon />
            {switchError?.message || error?.message}
          </Alert>
        ) : (
          <Flex align="center">
            <Flex direction="column" align="start">
              <AddressCopyButton variant="outline" address={address} />
            </Flex>

            <Button
              onClick={disconnectWallet}
              variant="outline"
              ml="auto"
              size="sm"
            >
              {activeProvider?.isMetaMask ? "Switch" : "Disconnect"}
            </Button>
          </Flex>
        )}
      </Stack>
    </Flex>
  );
};
