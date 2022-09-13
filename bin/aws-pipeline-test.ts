#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AwsPipelineTestStack } from '../lib/aws-pipeline-test-stack';

const app = new cdk.App();
new AwsPipelineTestStack(app, 'AwsPipelineTestStack', {
  // env: { account: '123456789012', region: 'us-east-1' },
});