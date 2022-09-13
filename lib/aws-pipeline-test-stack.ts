import * as cdk from 'aws-cdk-lib';
import { CodePipeline, CodePipelineSource, ManualApprovalStep, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { MyPipelineAppStage } from './stage';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsPipelineTestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'PipeLine', {
      pipelineName: 'TestPipeLine',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('aaronsr/aws-pipeline-test', 'master'),
        commands: ['npm ci',
                   'npm run build',
                   'npx cdk synth'
                  ]
      })
    })

    const testingStage = pipeline.addStage(new MyPipelineAppStage(this, "test", {}));


    //testingStage.addPre(new ShellStep("Run Unit Tests", { commands: ['npm install', 'npm test'] }));
    testingStage.addPost(new ManualApprovalStep('Manual approval before production'));

    const prodStage = pipeline.addStage(new MyPipelineAppStage(this, "prod", {}));

  }
}
