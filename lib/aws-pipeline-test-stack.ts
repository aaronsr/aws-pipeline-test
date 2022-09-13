import * as cdk from 'aws-cdk-lib';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsPipelineTestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new CodePipeline(this, 'PipeLine', {
      pipelineName: 'TestPipeLine',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('aaronsr/aws-pipeline-test', 'main'),
        commands: ['npm ci',
                   'npm run build',
                   'cdk synth'
                  ]
      })
    })

  }
}
